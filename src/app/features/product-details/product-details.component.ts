import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

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
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  public readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private routeSubscription?: Subscription;

  product: Product | null = null;
  loading = true;
  selectedImageIndex = 0;
  quantity = 1;
  selectedColor = '';

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        const id = Number(productId);
        if (!isNaN(id)) {
          this.loadProduct(id);
        } else {
          this.loading = false;
          this.router.navigate(['/products']);
        }
      } else {
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadProduct(id: number): void {
    this.loading = true;
    this.selectedImageIndex = 0;
    this.quantity = 1;
    this.product = null;
    this.cdr.detectChanges();

    this.productService.getProductById(id).pipe(take(1)).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.selectedColor = product.color || '';
          if (!product.images || product.images.length === 0) {
            product.images = [product.image];
          }
        } else {
          this.product = null;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.product = null;
        this.cdr.detectChanges();
      }
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
    if (goCart) {
      this.router.navigate(['/cart']);
    }
  }

  isInStock(): boolean {
    return this.product ? this.product.stock > 0 : false;
  }
}
