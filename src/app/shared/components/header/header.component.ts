import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  searchQuery = '';
  userMenuOpen = false;
  mobileMenuOpen = false;
  private bodyScrollPosition = 0;
  
  readonly currentUser = this.authService.currentUser;
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly isSeller = this.authService.isSeller;
  readonly cartItemCount = this.cartService.itemCount;

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery.trim() } });
      this.searchQuery = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.lockBodyScroll();
    } else {
      this.unlockBodyScroll();
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.unlockBodyScroll();
  }

  private lockBodyScroll(): void {
    // Store current scroll position
    this.bodyScrollPosition = window.scrollY;
    
    // Prevent scrolling on body and html
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.bodyScrollPosition}px`;
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    // Restore scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
    
    // Restore scroll position
    window.scrollTo(0, this.bodyScrollPosition);
  }
}
