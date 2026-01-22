import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order, Address, PaymentInfo } from '../models/order.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [];

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

    const order: Order = {
      id: (this.mockOrders.length + 1).toString(),
      userId: userId,
      items: items,
      address: address,
      paymentInfo: paymentInfo,
      status: 'pending',
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      total: total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mockOrders.push(order);
    return of(order).pipe(delay(500));
  }

  getUserOrders(userId: string): Observable<Order[]> {
    const userOrders = this.mockOrders.filter(order => order.userId === userId);
    return of(userOrders).pipe(delay(300));
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.mockOrders.find(o => o.id === orderId);
    return of(order).pipe(delay(200));
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return of(order).pipe(delay(300));
  }
}
