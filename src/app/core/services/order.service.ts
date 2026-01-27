import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, Address, PaymentInfo } from '../models/order.model';
import { CartItem } from '../models/cart.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/orders`;

  createOrder(
    userId: number,
    items: CartItem[],
    address: Address,
    paymentInfo: PaymentInfo
  ): Observable<Order> {
    // Map CartItem[] to backend CartItemDTO[] format
    const cartItems = items.map(item => ({
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        image: item.product.image,
        images: item.product.images,
        category: item.product.category,
        categoryId: item.product.categoryId,
        color: item.product.color,
        stock: item.product.stock,
        rating: item.product.rating,
        reviewCount: item.product.reviewCount,
        brand: item.product.brand,
        createdAt: item.product.createdAt,
        updatedAt: item.product.updatedAt
      },
      quantity: item.quantity,
      selected: item.selected
    }));

    const orderRequest = {
      items: cartItems,
      address: address,
      paymentInfo: paymentInfo
    };

    return this.http.post<Order>(this.apiUrl, orderRequest);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(orderId: number, status: Order['status']): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}/status`, null, {
      params: new HttpParams().set('status', status)
    });
  }
}
