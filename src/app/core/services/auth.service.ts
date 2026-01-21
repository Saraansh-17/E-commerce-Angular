import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, delay, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly apiUrl = '/api/auth';
  private readonly TOKEN_KEY = 'ecommerce_token';
  private readonly USER_KEY = 'ecommerce_user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  public readonly currentUser = signal<User | null>(null);
  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly isSeller = computed(() => this.currentUser()?.role === 'seller' || this.currentUser()?.role === 'admin');
  public readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadUserFromStorage();
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          role: credentials.email.includes('seller') ? 'seller' : 'customer',
          createdAt: new Date().toISOString()
        };

        const mockToken = 'mock_jwt_token_' + Date.now();

        const response: AuthResponse = {
          user: mockUser,
          token: mockToken
        };

        this.setAuth(response);
        return response;
      })
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const newUser: User = {
          id: (Math.random() * 1000).toString(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role || 'customer',
          createdAt: new Date().toISOString()
        };

        const mockToken = 'mock_jwt_token_' + Date.now();

        const response: AuthResponse = {
          user: newUser,
          token: mockToken
        };

        this.setAuth(response);
        return response;
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem(this.TOKEN_KEY)
      : null;
  }

  isAuthenticatedCheck(): boolean {
    return this.currentUserSubject.value !== null;
  }

  private setAuth(authResponse: AuthResponse): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    }
    this.currentUserSubject.next(authResponse.user);
    this.currentUser.set(authResponse.user);
  }

  private loadUserFromStorage(): void {
    if (typeof window === 'undefined') {
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
