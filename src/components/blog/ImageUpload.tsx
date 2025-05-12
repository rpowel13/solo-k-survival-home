
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

export const ImageUpload = ({ onUploadComplete }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB for better performance)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB for better page performance",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      // Compress the image before uploading if it's a jpeg or png
      let fileToUpload = file;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        fileToUpload = await compressImage(file);
      }
      
      // Upload the file using a Web Worker if available
      if (window.Worker) {
        const workerBlob = new Blob([`
          onmessage = async function(e) {
            const { fileData, fileName, apiKey, url } = e.data;
            
            try {
              const file = new File([fileData], fileName, { type: fileData.type });
              const formData = new FormData();
              formData.append('file', file);
              
              const response = await fetch(url, {
                method: 'POST',
                headers: { 'apikey': apiKey },
                body: formData
              });
              
              if (!response.ok) throw new Error('Upload failed');
              const result = await response.json();
              
              postMessage({ success: true, data: result });
            } catch (error) {
              postMessage({ success: false, error: error.message });
            }
          }
        `], { type: 'application/javascript' });
        
        const workerURL = URL.createObjectURL(workerBlob);
        const worker = new Worker(workerURL);
        
        worker.onmessage = (e) => {
          if (e.data.success) {
            processUploadSuccess(fileName);
          } else {
            throw new Error(e.data.error);
          }
          URL.revokeObjectURL(workerURL);
          worker.terminate();
        };
        
        worker.onerror = (e) => {
          console.error('Worker error:', e);
          fallbackUpload(fileToUpload, fileName);
          URL.revokeObjectURL(workerURL);
        };
        
        // Try worker-based upload, fallback to direct if needed
        try {
          worker.postMessage({
            fileData: fileToUpload,
            fileName,
            apiKey: supabase.auth.apiKey,
            url: `${supabase.supabaseUrl}/storage/v1/object/blog-images/${fileName}`
          });
        } catch (e) {
          console.warn('Worker upload failed, using fallback:', e);
          fallbackUpload(fileToUpload, fileName);
          URL.revokeObjectURL(workerURL);
          worker.terminate();
        }
      } else {
        // Fallback for browsers without Worker support
        fallbackUpload(fileToUpload, fileName);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    } finally {
      // Reset input value
      const input = event.target;
      if (input) input.value = '';
    }
  };
  
  const fallbackUpload = async (fileToUpload: File, fileName: string) => {
    try {
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, fileToUpload);

      if (uploadError) {
        throw uploadError;
      }

      processUploadSuccess(fileName);
    } catch (error) {
      console.error('Fallback upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };
  
  const processUploadSuccess = (fileName: string) => {
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
    
    // Return the URL to the parent component
    onUploadComplete(publicUrl);
    
    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully",
    });
    
    setIsUploading(false);
  };
  
  // Function to compress images before uploading
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions (max 1200px width or height)
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;
          
          if (width > height && width > maxDimension) {
            height = Math.round(height * maxDimension / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round(width * maxDimension / height);
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress the image
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }
              // Create a new file with the compressed blob
              const compressedFile = new File(
                [blob], 
                file.name, 
                { type: file.type, lastModified: Date.now() }
              );
              resolve(compressedFile);
            },
            file.type,
            0.8 // Quality (0.8 = 80%)
          );
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button 
          type="button" 
          variant="outline" 
          disabled={isUploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
};
