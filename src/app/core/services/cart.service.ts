import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, CartSummary } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly CART_STORAGE_KEY = 'ecommerce_cart';
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$ = this.cartItemsSubject.asObservable();

  public readonly cartItems = signal<CartItem[]>([]);
  public readonly itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  public readonly cartTotal = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadCartFromStorage();
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.updateCart(updatedItems);
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        selected: true
      };
      this.updateCart([...currentItems, newItem]);
    }
  }

  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.updateCart(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = this.cartItemsSubject.value.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.updateCart(updatedItems);
  }

  toggleItemSelection(productId: string): void {
    const updatedItems = this.cartItemsSubject.value.map(item =>
      item.product.id === productId ? { ...item, selected: !item.selected } : item
    );
    this.updateCart(updatedItems);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getCartSummary(): CartSummary {
    const items = this.cartItemsSubject.value.filter(item => item.selected);
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      subtotal,
      tax,
      shipping,
      total,
      itemCount
    };
  }

  getCartSummary$(): Observable<CartSummary> {
    return new Observable(observer => {
      const subscription = this.cartItems$.subscribe(() => {
        observer.next(this.getCartSummary());
      });
      return () => subscription.unsubscribe();
    });
  }

  isInCart(productId: string): boolean {
    return this.cartItemsSubject.value.some(item => item.product.id === productId);
  }

  getQuantity(productId: string): number {
    const item = this.cartItemsSubject.value.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.cartItems.set(items);
    this.saveCartToStorage(items);
  }

  private loadCartFromStorage(): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const stored = localStorage.getItem(this.CART_STORAGE_KEY);
      if (stored) {
        const items: CartItem[] = JSON.parse(stored);
        this.cartItemsSubject.next(items);
        this.cartItems.set(items);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.cartItemsSubject.next([]);
      this.cartItems.set([]);
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }
}
