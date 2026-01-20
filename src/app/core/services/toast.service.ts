import { Injectable } from '@angular/core';

export interface ToastConfig {
  message: string;
  action?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Array<ToastConfig & { id: number }> = [];
  private toastIdCounter = 0;

  show(config: ToastConfig): { onAction: () => void } {
    const id = this.toastIdCounter++;
    const toast = { ...config, id };
    this.toasts.push(toast);

    const duration = config.duration || 3000;
    
    setTimeout(() => {
      this.removeToast(id);
    }, duration);

    return {
      onAction: () => {
        if (config.action) {
          this.removeToast(id);
        }
      }
    };
  }

  getToasts(): Array<ToastConfig & { id: number }> {
    return this.toasts;
  }

  removeToast(id: number): void {
    const index = this.toasts.findIndex(t => t.id === id);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
