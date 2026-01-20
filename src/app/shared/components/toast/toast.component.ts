import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.getToasts(); track toast.id) {
        <div class="toast" [class.show]="true">
          <span class="toast-message">{{ toast.message }}</span>
          @if (toast.action) {
            <button class="toast-action" (click)="handleAction(toast.id)">{{ toast.action }}</button>
          }
          <button class="toast-close" (click)="close(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 80px;
      right: 16px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      min-width: 300px;
      max-width: 500px;
      padding: 14px 16px;
      background: #EDEADE;
      color: var(--text-on-surface);
      border-radius: var(--r-md);
      box-shadow: var(--shadow-2);
      border: 1px solid rgba(11, 18, 32, 0.12);
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
    }

    .toast-action {
      background: transparent;
      border: 1px solid rgba(109, 40, 217, 0.4);
      color: var(--accent-violet-700);
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }

    .toast-action:hover {
      background: rgba(109, 40, 217, 0.1);
      border-color: var(--accent-violet-700);
    }

    .toast-close {
      background: transparent;
      border: none;
      color: var(--text-on-surface-muted);
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .toast-close:hover {
      color: var(--text-on-surface);
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  handleAction(toastId: number): void {
    const toast = this.toastService.getToasts().find(t => t.id === toastId);
    if (toast?.action) {
      this.close(toastId);
    }
  }

  close(toastId: number): void {
    this.toastService.removeToast(toastId);
  }
}
