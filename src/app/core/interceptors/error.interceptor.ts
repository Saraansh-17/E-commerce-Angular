import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Bad request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please login again.';
            // Clear authentication and redirect to login (only in browser)
            if (isBrowser) {
              authService.logout();
              const returnUrl = router.url;
              router.navigate(['/auth/login'], { 
                queryParams: { returnUrl: returnUrl !== '/auth/login' ? returnUrl : undefined } 
              });
            }
            break;
          case 403:
            errorMessage = error.error?.message || 'Forbidden. You do not have permission to access this resource.';
            break;
          case 404:
            errorMessage = error.error?.message || 'Resource not found.';
            break;
          case 500:
            errorMessage = error.error?.message || 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error: ${error.message}`;
        }
      }

      console.error('HTTP Error:', errorMessage, error);

      return throwError(() => error);
    })
  );
};
