import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductFilters, Category } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductCardComponent,
    LoadingComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  
  filters: ProductFilters = {
    search: '',
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    color: '',
    sortBy: 'name'
  };

  page = 1;
  pageSize = 12;
  totalItems = 0;
  totalPages = 0;

  colors: string[] = ['Black', 'White', 'Silver', 'Brown', 'Blue', 'Gray', 'Purple'];

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.filters.search = params['search'];
      }
      if (params['category']) {
        const categoryId = Number(params['category']);
        this.filters.category = !isNaN(categoryId) ? categoryId : undefined;
      }
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.filters, this.page, this.pageSize).subscribe(response => {
      this.products = response.products;
      this.totalItems = response.meta.totalItems;
      this.totalPages = response.meta.totalPages;
      this.loading = false;
    });
  }

  onCategoryChange(value: string | number): void {
    if (value === '' || value === undefined || value === null) {
      this.filters.category = undefined;
    } else {
      const categoryId = typeof value === 'string' ? Number(value) : value;
      this.filters.category = !isNaN(categoryId) ? categoryId : undefined;
    }
  }

  applyFilters(): void {
    this.page = 1;
    this.updateQueryParams();
    this.loadProducts();
  }

  clearFilters(): void {
    this.filters = {
      search: '',
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      color: '',
      sortBy: 'name'
    };
    this.page = 1;
    this.updateQueryParams();
    this.loadProducts();
  }

  onPageChange(direction: 'prev' | 'next'): void {
    const nextPage = direction === 'next' ? this.page + 1 : this.page - 1;
    if (nextPage < 1 || nextPage > this.totalPages) return;
    this.page = nextPage;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateQueryParams(): void {
    const queryParams: any = {};
    if (this.filters.search) queryParams.search = this.filters.search;
    if (this.filters.category !== undefined) queryParams.category = this.filters.category.toString();
    if (this.filters.color) queryParams.color = this.filters.color;
    if (this.filters.minPrice) queryParams.minPrice = this.filters.minPrice;
    if (this.filters.maxPrice) queryParams.maxPrice = this.filters.maxPrice;
    if (this.filters.sortBy) queryParams.sortBy = this.filters.sortBy;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Remove a filter chip
   */
  removeFilter(key: keyof ProductFilters): void {
    if (key === 'minPrice' || key === 'maxPrice' || key === 'category') {
      (this.filters as any)[key] = undefined;
    } else {
      (this.filters as any)[key] = '';
    }
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.filters.search ||
      this.filters.category ||
      this.filters.color ||
      this.filters.minPrice ||
      this.filters.maxPrice ||
      (this.filters.sortBy && this.filters.sortBy !== 'name')
    );
  }
  
  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return '';
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

}
