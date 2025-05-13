
import { useToast as useToastHook, toast as toastFunction } from "@/hooks/use-toast";
import type { ToastActionElement, ToastProps as HookToastProps } from "@/hooks/use-toast";

export const useToast = useToastHook;
export const toast = toastFunction;
export type ToastProps = HookToastProps;
export type { ToastActionElement };
