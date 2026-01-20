export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryId: string;
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
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
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
