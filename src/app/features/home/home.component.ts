import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    LoadingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);

  @ViewChild('categoryTrack') private readonly categoryTrack?: ElementRef<HTMLElement>;

  categories: Category[] = [];
  featuredProducts: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      categories: this.productService.getCategories(),
      featuredProducts: this.productService.getFeaturedProducts(6)
    }).subscribe({
      next: ({ categories, featuredProducts }) => {
        this.categories = categories;
        this.featuredProducts = featuredProducts;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  scrollCategories(direction: 'left' | 'right'): void {
    const el = this.categoryTrack?.nativeElement;
    if (!el) return;

    const amount = Math.max(340, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  getCategoryIcon(categoryId: string): string {
    const icons: Record<string, string> = {
      'electronics': '📱',
      'clothing': '👕',
      'footwear': '👟',
      'accessories': '👜',
      'home-kitchen': '🏠',
      'sports': '⚽'
    };
    return icons[categoryId] || '📦';
  }
}
