import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem, CartSummary } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartItems: CartItem[] = [];
  cartSummary: CartSummary | null = null;
  message: string | null = null;
  private messageTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartSummary = this.cartService.getCartSummary();
    });
  }

  /**
   * Update item quantity
   */
  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }

    if (quantity > item.product.stock) {
      this.showMessage('Insufficient stock');
      return;
    }

    this.cartService.updateQuantity(item.product.id, quantity);
    this.showMessage('Quantity updated');
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id);
    this.showMessage('Item removed');
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.showMessage('Cart cleared');
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  private showMessage(text: string): void {
    this.message = text;
    if (this.messageTimer) clearTimeout(this.messageTimer);
    this.messageTimer = setTimeout(() => (this.message = null), 2200);
  }
}
