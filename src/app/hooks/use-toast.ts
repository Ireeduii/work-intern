import { toast as sonnerToast } from "sonner";

export const toast = sonnerToast;

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  };
}
