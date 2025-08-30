export type ToastType = 'success' | 'error';

export type ToastConfig = {
  message: string;
  type: ToastType;
  duration?: number;
}
