import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { Product, Category, ProductFilters, PaginatedProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/products'; // Placeholder for API integration

  // Mock data - in production, this would come from an API
  private readonly mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500'
      ],
      category: 'Electronics',
      categoryId: 'electronics',
      color: 'Black',
      stock: 50,
      rating: 4.5,
      reviewCount: 234,
      brand: 'TechSound',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance. Stay connected and healthy.',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'
      ],
      category: 'Electronics',
      categoryId: 'electronics',
      color: 'Silver',
      stock: 30,
      rating: 4.7,
      reviewCount: 189,
      brand: 'TechTime',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Cotton T-Shirt',
      description: 'Comfortable 100% organic cotton t-shirt. Soft, breathable, and perfect for everyday wear.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
      ],
      category: 'Clothing',
      categoryId: 'clothing',
      color: 'White',
      stock: 100,
      rating: 4.3,
      reviewCount: 156,
      brand: 'EcoWear',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12'
    },
    {
      id: '4',
      name: 'Leather Jacket',
      description: 'Genuine leather jacket with classic design. Durable, stylish, and perfect for any season.',
      price: 399.99,
      originalPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'
      ],
      category: 'Clothing',
      categoryId: 'clothing',
      color: 'Brown',
      stock: 25,
      rating: 4.6,
      reviewCount: 98,
      brand: 'LeatherCraft',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '5',
      name: 'Running Shoes',
      description: 'Lightweight running shoes with advanced cushioning technology. Perfect for athletes and runners.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
      ],
      category: 'Footwear',
      categoryId: 'footwear',
      color: 'Blue',
      stock: 75,
      rating: 4.4,
      reviewCount: 312,
      brand: 'RunFast',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      id: '6',
      name: 'Laptop Backpack',
      description: 'Spacious laptop backpack with multiple compartments. Water-resistant and ergonomic design.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500'
      ],
      category: 'Accessories',
      categoryId: 'accessories',
      color: 'Gray',
      stock: 60,
      rating: 4.5,
      reviewCount: 201,
      brand: 'TravelPro',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-11'
    },
    {
      id: '7',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.',
      price: 149.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
      images: [
        'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'
      ],
      category: 'Home & Kitchen',
      categoryId: 'home-kitchen',
      color: 'Black',
      stock: 40,
      rating: 4.6,
      reviewCount: 167,
      brand: 'BrewMaster',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-09'
    },
    {
      id: '8',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat with superior grip. Eco-friendly and easy to clean.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      images: [
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'
      ],
      category: 'Sports',
      categoryId: 'sports',
      color: 'Purple',
      stock: 90,
      rating: 4.4,
      reviewCount: 145,
      brand: 'FitLife',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    }
  ];

  private readonly mockCategories: Category[] = [
    { id: 'electronics', name: 'Electronics', slug: 'electronics', description: 'Latest tech gadgets and devices' },
    { id: 'clothing', name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel' },
    { id: 'footwear', name: 'Footwear', slug: 'footwear', description: 'Shoes and boots' },
    { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Bags, watches, and more' },
    { id: 'home-kitchen', name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Home essentials and kitchenware' },
    { id: 'sports', name: 'Sports', slug: 'sports', description: 'Sports and fitness equipment' }
  ];

  getProducts(filters?: ProductFilters, page: number = 1, pageSize: number = 12): Observable<PaginatedProducts> {
    return of(this.mockProducts).pipe(
      delay(300),
      map(products => this.applyFilters(products, filters)),
      map(filteredProducts => this.paginate(filteredProducts, page, pageSize))
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find(p => p.id === id)).pipe(delay(200));
  }

  getFeaturedProducts(limit: number = 6): Observable<Product[]> {
    return of(this.mockProducts.slice(0, limit)).pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories).pipe(delay(150));
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return of(this.mockProducts.filter(p => p.categoryId === categoryId)).pipe(delay(200));
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return of(
      this.mockProducts.filter(
        p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)
      )
    ).pipe(delay(200));
  }

  private applyFilters(products: Product[], filters?: ProductFilters): Product[] {
    if (!filters) return products;

    let filtered = [...products];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(p => p.categoryId === filters.category);
    }

    if (filters.color) {
      filtered = filtered.filter(p => p.color.toLowerCase() === filters.color?.toLowerCase());
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.sortBy) {
      filtered = this.sortProducts(filtered, filters.sortBy);
    }

    return filtered;
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }

  private paginate(products: Product[], page: number, pageSize: number): PaginatedProducts {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / pageSize);

    return {
      products: paginatedProducts,
      meta: {
        page,
        pageSize,
        totalItems: products.length,
        totalPages
      }
    };
  }

  private buildParams(filters?: ProductFilters, page?: number, pageSize?: number): HttpParams {
    let params = new HttpParams();

    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.color) params = params.set('color', filters.color);
    if (filters?.minPrice) params = params.set('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params = params.set('maxPrice', filters.maxPrice.toString());
    if (filters?.sortBy) params = params.set('sortBy', filters.sortBy);
    if (page) params = params.set('page', page.toString());
    if (pageSize) params = params.set('pageSize', pageSize.toString());

    return params;
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: (this.mockProducts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(300));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.mockProducts[index] = { ...this.mockProducts[index], ...product, updatedAt: new Date().toISOString() };
    return of(this.mockProducts[index]).pipe(delay(300));
  }

  deleteProduct(id: string): Observable<void> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
    }
    return of(undefined).pipe(delay(300));
  }
}
