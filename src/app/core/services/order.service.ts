import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Order, Address, PaymentInfo } from '../models/order.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/orders';
  private readonly orders: Order[] = [];

  createOrder(
    userId: string,
    items: CartItem[],
    address: Address,
    paymentInfo: PaymentInfo
  ): Observable<Order> {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      userId,
      items: [...items],
      address,
      paymentInfo,
      status: 'pending',
      subtotal,
      tax,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders.push(newOrder);
    return of(newOrder).pipe(delay(500));
  }

  /**
   * Get orders for a user
   */
  getUserOrders(userId: string): Observable<Order[]> {
    // In production: return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
    return of(this.orders.filter(order => order.userId === userId)).pipe(delay(300));
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    return of(this.orders.find(order => order.id === orderId)).pipe(delay(200));
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return of(order).pipe(delay(300));
  }
}
