import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order } from '../../core/models/order.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  orders: Order[] = [];
  loading = true;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loadOrders(user.id);
    }
  }

  /**
   * Load user orders
   */
  private loadOrders(userId: string): void {
    this.orderService.getUserOrders(userId).subscribe(orders => {
      this.orders = orders;
      this.loading = false;
    });
  }

  /**
   * Get status color for chip
   */
  getStatusColor(status: Order['status']): string {
    const colors: Record<Order['status'], string> = {
      pending: 'warn',
      processing: 'accent',
      shipped: 'primary',
      delivered: 'primary',
      cancelled: 'warn'
    };
    return colors[status] || '';
  }
}
