import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const sellerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (user && (user.role === 'SELLER' || user.role === 'ADMIN')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
