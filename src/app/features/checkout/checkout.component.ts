import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { CartSummary } from '../../core/models/cart.model';
import { Address, PaymentInfo } from '../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  checkoutForm!: FormGroup;
  cartSummary: CartSummary | null = null;
  submitting = false;

  paymentMethods = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'cash-on-delivery', label: 'Cash on Delivery' }
  ];

  ngOnInit(): void {
    this.cartSummary = this.cartService.getCartSummary();
    
    if (!this.cartSummary || this.cartSummary.items.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    
    this.checkoutForm = this.fb.group({
      firstName: [currentUser?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [currentUser?.lastName || '', [Validators.required, Validators.minLength(2)]],
      email: [currentUser?.email || '', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['United States', [Validators.required]],
      
      // Payment
      paymentMethod: ['credit-card', [Validators.required]],
      cardNumber: [''],
      cardHolder: [''],
      expiryDate: [''],
      cvv: ['']
    });

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const cardNumber = this.checkoutForm.get('cardNumber');
      const cardHolder = this.checkoutForm.get('cardHolder');
      const expiryDate = this.checkoutForm.get('expiryDate');
      const cvv = this.checkoutForm.get('cvv');

      if (method === 'credit-card' || method === 'debit-card') {
        cardNumber?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        cardHolder?.setValidators([Validators.required]);
        expiryDate?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
        cvv?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
      } else {
        cardNumber?.clearValidators();
        cardHolder?.clearValidators();
        expiryDate?.clearValidators();
        cvv?.clearValidators();
      }

      cardNumber?.updateValueAndValidity();
      cardHolder?.updateValueAndValidity();
      expiryDate?.updateValueAndValidity();
      cvv?.updateValueAndValidity();
    });
  }

  /**
   * Submit checkout form
   */
  onSubmit(): void {
    if (this.checkoutForm.invalid || !this.cartSummary) {
      this.markFormGroupTouched(this.checkoutForm);
      return;
    }

    this.submitting = true;
    const formValue = this.checkoutForm.value;
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const address: Address = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      street: formValue.street,
      city: formValue.city,
      state: formValue.state,
      zipCode: formValue.zipCode,
      country: formValue.country
    };

    const paymentInfo: PaymentInfo = {
      method: formValue.paymentMethod,
      cardNumber: formValue.cardNumber,
      cardHolder: formValue.cardHolder,
      expiryDate: formValue.expiryDate,
      cvv: formValue.cvv
    };

    this.orderService.createOrder(user.id, this.cartSummary.items, address, paymentInfo).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.toastService.show({ 
          message: 'Order placed successfully!', 
          action: 'View Order', 
          duration: 5000 
        });
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        this.submitting = false;
        this.toastService.show({ 
          message: 'Failed to place order. Please try again.', 
          duration: 5000 
        });
        console.error('Order error:', error);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }
}
