
import { toast } from "@/components/ui/use-toast";
import { type ToastProps } from "@/components/ui/toast";

/**
 * Validates a file to ensure it meets size and type requirements
 * @returns An object containing validation result and error message if applicable
 */
export const validateImageFile = (
  file: File,
  showToast: (toast: ToastProps) => void
): { isValid: boolean } => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    showToast({
      title: "Invalid file type",
      description: "Please upload an image file (JPEG, PNG, GIF, etc.)",
      variant: "destructive",
    });
    return { isValid: false };
  }

  // Validate file size (max 2MB for better performance)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast({
      title: "File too large",
      description: "Please upload an image smaller than 2MB for better page performance",
      variant: "destructive",
    });
    return { isValid: false };
  }

  return { isValid: true };
};
