import { toast } from "sonner";

export { toast };

export function notifyCopied(message: string) {
  toast.success(message);
}

export function notifyCopyFailed(message: string) {
  toast.error(message);
}
