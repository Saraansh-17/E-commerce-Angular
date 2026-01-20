import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
