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
      top: 100px;
      right: 24px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 16px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      min-width: 320px;
      max-width: 520px;
      padding: 18px 20px;
      background: var(--royal-cream);
      color: var(--royal-charcoal);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-2);
      border: 1px solid rgba(10, 22, 40, 0.12);
      display: flex;
      align-items: center;
      gap: 16px;
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
      font-size: 15px;
      font-weight: 600;
    }

    .toast-action {
      background: transparent;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: var(--royal-gold);
      padding: 8px 16px;
      border-radius: var(--r-sm);
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .toast-action:hover {
      background: rgba(212, 175, 55, 0.15);
      border-color: var(--royal-gold);
    }

    .toast-close {
      background: transparent;
      border: none;
      color: rgba(44, 62, 80, 0.6);
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
      font-weight: 700;
    }

    .toast-close:hover {
      color: var(--royal-charcoal);
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
