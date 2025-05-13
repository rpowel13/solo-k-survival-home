
import { supabase } from "@/lib/supabase";

/**
 * Fallback upload method when web worker implementation fails
 */
export const fallbackUpload = async (
  fileToUpload: File, 
  fileName: string,
  onSuccess: (fileName: string) => void, 
  onError: (error: any) => void
) => {
  try {
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, fileToUpload);

    if (uploadError) {
      throw uploadError;
    }

    onSuccess(fileName);
  } catch (error) {
    console.error('Fallback upload error:', error);
    onError(error);
  }
};

/**
 * Process a successful upload
 */
export const processUploadSuccess = (
  fileName: string,
  onComplete: (url: string) => void,
  onToast: () => void
) => {
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);
  
  // Return the URL to the parent component
  onComplete(publicUrl);
  onToast();
};

/**
 * Create a unique filename for uploading
 */
export const createUniqueFileName = (file: File): string => {
  const fileExt = file.name.split('.').pop();
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
};

/**
 * Try to upload using a Web Worker
 */
export const tryWorkerUpload = (
  fileToUpload: File, 
  fileName: string, 
  onSuccess: (fileName: string) => void,
  onError: (error: any) => void
) => {
  const workerBlob = new Blob([`
    onmessage = async function(e) {
      const { fileData, fileName, url } = e.data;
      
      try {
        const file = new File([fileData], fileName, { type: fileData.type });
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(url, {
          method: 'POST',
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
      onSuccess(fileName);
    } else {
      onError(new Error(e.data.error));
    }
    URL.revokeObjectURL(workerURL);
    worker.terminate();
  };
  
  worker.onerror = (e) => {
    console.error('Worker error:', e);
    fallbackUpload(fileToUpload, fileName, onSuccess, onError);
    URL.revokeObjectURL(workerURL);
  };
  
  try {
    worker.postMessage({
      fileData: fileToUpload,
      fileName,
      url: `${window.location.origin}/api/upload/${fileName}`
    });
  } catch (e) {
    console.warn('Worker upload failed, using fallback:', e);
    fallbackUpload(fileToUpload, fileName, onSuccess, onError);
    URL.revokeObjectURL(workerURL);
    worker.terminate();
  }
};
