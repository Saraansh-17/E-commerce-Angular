import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/models/product.model';
import { ToastService } from '../../core/services/toast.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss'
})
export class SellerComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingProduct: Product | null = null;
  
  productForm: FormGroup;
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'category', 'actions'];

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      originalPrice: [0],
      image: ['', [Validators.required]],
      images: [''],
      category: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      color: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      rating: [0],
      reviewCount: [0],
      brand: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load products and categories
   */
  private loadData(): void {
    this.productService.getSellerProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  /**
   * Open form to add new product
   */
  openAddForm(): void {
    this.editingProduct = null;
    this.productForm.reset({
      price: 0,
      originalPrice: 0,
      stock: 0,
      rating: 0,
      reviewCount: 0
    });
    this.showForm = true;
  }

  /**
   * Open form to edit product
   */
  openEditForm(product: Product): void {
    this.editingProduct = product;
    const category = this.categories.find(c => c.id === product.categoryId);
    this.productForm.patchValue({
      ...product,
      category: category?.name || product.category,
      images: product.images.join(', ')
    });
    this.showForm = true;
  }

  /**
   * Cancel form
   */
  cancelForm(): void {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset();
  }

  /**
   * Submit product form
   */
  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formValue = this.productForm.value;
    const selectedCategory = this.categories.find(c => c.id === Number(formValue.categoryId));
    const productData = {
      ...formValue,
      categoryId: formValue.categoryId ? Number(formValue.categoryId) : undefined,
      category: selectedCategory?.name || formValue.category || '',
      images: formValue.images ? formValue.images.split(',').map((img: string) => img.trim()) : [formValue.image]
    };

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, productData).subscribe({
        next: () => {
          this.toastService.show({ message: 'Product updated successfully!', duration: 3000 });
          this.cancelForm();
          this.loadData();
        },
        error: (error) => {
          this.toastService.show({ message: 'Failed to update product', duration: 3000 });
          console.error('Update error:', error);
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.toastService.show({ message: 'Product created successfully!', duration: 3000 });
          this.cancelForm();
          this.loadData();
        },
        error: (error) => {
          this.toastService.show({ message: 'Failed to create product', duration: 3000 });
          console.error('Create error:', error);
        }
      });
    }
  }

  /**
   * Delete product
   */
  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.toastService.show({ message: 'Product deleted successfully!', duration: 3000 });
          this.loadData();
        },
        error: (error) => {
          this.toastService.show({ message: 'Failed to delete product', duration: 3000 });
          console.error('Delete error:', error);
        }
      });
    }
  }
}
