
import { useState, memo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { compressImage } from "@/utils/imageUtils";
import { validateImageFile } from "./ImageValidator";
import { 
  createUniqueFileName, 
  processUploadSuccess, 
  fallbackUpload, 
  tryWorkerUpload 
} from "@/utils/uploadWorkerUtils";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

const ImageUploadComponent = ({ onUploadComplete }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Memoize the upload handler to prevent unnecessary recreations
  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate the file
    const { isValid } = validateImageFile(file, toast);
    if (!isValid) return;

    setIsUploading(true);
    
    try {
      // Create a unique filename
      const fileName = createUniqueFileName(file);
      
      // Compress the image before uploading if it's a jpeg or png
      let fileToUpload = file;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        fileToUpload = await compressImage(file);
      }
      
      // Upload the file using a Web Worker if available
      if (window.Worker) {
        tryWorkerUpload(
          fileToUpload, 
          fileName,
          (successFileName) => {
            processUploadSuccess(
              successFileName, 
              onUploadComplete,
              () => toast({
                title: "Image uploaded",
                description: "Your image has been uploaded successfully",
              })
            );
            setIsUploading(false);
          },
          (error) => {
            console.error('Error during worker upload:', error);
            toast({
              title: "Upload failed",
              description: "There was an error uploading your image. Please try again.",
              variant: "destructive",
            });
            setIsUploading(false);
          }
        );
      } else {
        // Fallback for browsers without Worker support
        fallbackUpload(
          fileToUpload, 
          fileName,
          (successFileName) => {
            processUploadSuccess(
              successFileName, 
              onUploadComplete, 
              () => toast({
                title: "Image uploaded",
                description: "Your image has been uploaded successfully",
              })
            );
            setIsUploading(false);
          },
          () => {
            toast({
              title: "Upload failed",
              description: "There was an error uploading your image. Please try again.",
              variant: "destructive",
            });
            setIsUploading(false);
          }
        );
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
  }, [onUploadComplete, toast]);

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
        // Add lazy loading attribute
        loading="lazy"
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

// Memoize the component to prevent unnecessary re-renders
export const ImageUpload = memo(ImageUploadComponent);
