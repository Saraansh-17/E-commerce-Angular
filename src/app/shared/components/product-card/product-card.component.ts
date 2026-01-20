import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() showAddToCart = true;

  addToCartClick = output<Product>();

  constructor(private readonly cartService: CartService) {}

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, 1);
    this.addToCartClick.emit(this.product);
  }

  isOnSale(): boolean {
    return !!this.product.originalPrice && this.product.originalPrice > this.product.price;
  }

  getDiscountPercent(): number {
    if (!this.isOnSale()) return 0;
    return Math.round(((this.product.originalPrice! - this.product.price) / this.product.originalPrice!) * 100);
  }
}
