import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly http = inject(HttpClient);
  private readonly TOKEN_KEY = 'ecommerce_token';
  private readonly USER_KEY = 'ecommerce_user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  public readonly currentUser = signal<User | null>(null);
  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly isSeller = computed(() => this.currentUser()?.role === 'SELLER' || this.currentUser()?.role === 'ADMIN');
  public readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  constructor() {
    if (this.isBrowser) {
      this.loadUserFromStorage();
      // If token exists, verify with backend
      if (this.getToken()) {
        this.getCurrentUserFromApi().subscribe({
          error: () => {
            // Token invalid, clear storage
            this.logout();
          }
        });
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setAuth(response);
        })
      );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    // Convert role to uppercase if provided, default to CUSTOMER
    let role = data.role || 'CUSTOMER';
    if (role) {
      role = role.toUpperCase() as 'CUSTOMER' | 'SELLER';
    }
    
    const registerRequest = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: role
    };
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, registerRequest)
      .pipe(
        tap(response => {
          this.setAuth(response);
        })
      );
  }

  getCurrentUserFromApi(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/auth/me`)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          this.currentUser.set(user);
          if (this.isBrowser) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  refreshCurrentUser(): void {
    if (this.getToken()) {
      this.getCurrentUserFromApi().subscribe();
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  isAuthenticatedCheck(): boolean {
    return this.isAuthenticated();
  }

  private setAuth(authResponse: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    }
    this.currentUserSubject.next(authResponse.user);
    this.currentUser.set(authResponse.user);
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (userStr) {
        const user: User = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.currentUser.set(user);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.currentUserSubject.next(null);
      this.currentUser.set(null);
    }
  }
}
