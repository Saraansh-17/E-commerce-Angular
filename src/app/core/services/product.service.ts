import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, Category, ProductFilters, PaginatedProducts } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/products`;

  getProducts(filters?: ProductFilters, page: number = 1, pageSize: number = 12): Observable<PaginatedProducts> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.category) {
      params = params.set('category', filters.category.toString());
    }
    if (filters?.color) {
      params = params.set('color', filters.color);
    }
    if (filters?.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }

    return this.http.get<{ products: Product[]; meta: { page: number; pageSize: number; totalItems: number; totalPages: number } }>(this.apiUrl, { params })
      .pipe(
        map(response => ({
          products: response.products,
          meta: {
            page: response.meta.page,
            pageSize: response.meta.pageSize,
            totalItems: Number(response.meta.totalItems),
            totalPages: response.meta.totalPages
          }
        }))
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getFeaturedProducts(limit: number = 6): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`, {
      params: new HttpParams().set('limit', limit.toString())
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getSellerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/seller/my-products`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts({ search: query }, 1, 100).pipe(
      map(response => response.products)
    );
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const productRequest = {
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      images: product.images,
      category: product.category,
      categoryId: product.categoryId,
      color: product.color,
      stock: product.stock,
      rating: product.rating,
      reviewCount: product.reviewCount,
      brand: product.brand
    };
    return this.http.post<Product>(this.apiUrl, productRequest);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    const productRequest: any = {};
    if (product.name !== undefined) productRequest.name = product.name;
    if (product.description !== undefined) productRequest.description = product.description;
    if (product.price !== undefined) productRequest.price = product.price;
    if (product.originalPrice !== undefined) productRequest.originalPrice = product.originalPrice;
    if (product.image !== undefined) productRequest.image = product.image;
    if (product.images !== undefined) productRequest.images = product.images;
    if (product.category !== undefined) productRequest.category = product.category;
    if (product.categoryId !== undefined) productRequest.categoryId = product.categoryId;
    if (product.color !== undefined) productRequest.color = product.color;
    if (product.stock !== undefined) productRequest.stock = product.stock;
    if (product.rating !== undefined) productRequest.rating = product.rating;
    if (product.reviewCount !== undefined) productRequest.reviewCount = product.reviewCount;
    if (product.brand !== undefined) productRequest.brand = product.brand;

    return this.http.put<Product>(`${this.apiUrl}/${id}`, productRequest);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
