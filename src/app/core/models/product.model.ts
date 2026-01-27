export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryId: number;
  color: string;
  stock: number;
  rating: number;
  reviewCount: number;
  brand?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Category model for product categorization
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface ProductFilters {
  search?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'rating';
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedProducts {
  products: Product[];
  meta: PaginationMeta;
}
