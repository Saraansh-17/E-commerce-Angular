import { Injectable } from '@angular/core';
import { Observable, map, of, delay } from 'rxjs';
import { Product, Category, ProductFilters, PaginatedProducts } from '../models/product.model';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(filters?: ProductFilters, page: number = 1, pageSize: number = 12): Observable<PaginatedProducts> {
    let filteredProducts = [...MOCK_PRODUCTS];

    // Apply filters
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === filters.category);
    }

    if (filters?.color) {
      filteredProducts = filteredProducts.filter(p => p.color === filters.color);
    }

    if (filters?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    // Pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return of({
      products: paginatedProducts,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages
      }
    }).pipe(delay(300));
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  getFeaturedProducts(limit: number = 6): Observable<Product[]> {
    const featured = MOCK_PRODUCTS
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return of(featured).pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return of(MOCK_CATEGORIES).pipe(delay(200));
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    const products = MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
    return of(products).pipe(delay(200));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts({ search: query }, 1, 100).pipe(
      map(response => response.products)
    );
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: (MOCK_PRODUCTS.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_PRODUCTS.push(newProduct);
    return of(newProduct).pipe(delay(300));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    MOCK_PRODUCTS[index] = {
      ...MOCK_PRODUCTS[index],
      ...product,
      updatedAt: new Date().toISOString()
    };
    return of(MOCK_PRODUCTS[index]).pipe(delay(300));
  }

  deleteProduct(id: string): Observable<void> {
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PRODUCTS.splice(index, 1);
    }
    return of(undefined).pipe(delay(300));
  }
}
