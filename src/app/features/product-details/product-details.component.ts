import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  public readonly router = inject(Router);

  product: Product | null = null;
  loading = true;
  selectedImageIndex = 0;
  quantity = 1;
  selectedColor = '';

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    } else {
      this.router.navigate(['/products']);
    }
  }

  private loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.selectedColor = product.color;
      } else {
        this.router.navigate(['/products']);
      }
      this.loading = false;
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  addToCart(): void {
    if (!this.product) return;

    if (this.quantity > this.product.stock) {
      alert('Insufficient stock');
      return;
    }

    this.cartService.addToCart(this.product, this.quantity);
    const goCart = confirm('Product added to cart. Go to cart?');
    if (goCart) this.router.navigate(['/cart']);
  }

  isInStock(): boolean {
    return this.product ? this.product.stock > 0 : false;
  }
}
