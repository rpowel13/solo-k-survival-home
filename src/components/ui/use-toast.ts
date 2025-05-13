
import { useToast as useToastHook, toast as toastFunction } from "@/hooks/use-toast";
import type { ToastProps } from "@/hooks/use-toast";

export const useToast = useToastHook;
export const toast = toastFunction;
export type { ToastProps };
