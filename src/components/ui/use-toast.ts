
import { useToast as useToastHook, toast as toastFunction, type ToastProps as HookToastProps, type ToastActionElement } from "@/hooks/use-toast";

export const useToast = useToastHook;
export const toast = toastFunction;
export type ToastProps = HookToastProps;
export type { ToastActionElement };
