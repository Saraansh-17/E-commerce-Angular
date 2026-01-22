import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly TOKEN_KEY = 'ecommerce_token';
  private readonly USER_KEY = 'ecommerce_user';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  public readonly currentUser = signal<User | null>(null);
  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly isSeller = computed(() => this.currentUser()?.role === 'seller' || this.currentUser()?.role === 'admin');
  public readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    if (this.isBrowser) {
      this.loadUserFromStorage();
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const user: User = {
      id: '1',
      email: credentials.email,
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    const authResponse: AuthResponse = {
      user: user,
      token: 'mock_token_' + Date.now()
    };
    this.setAuth(authResponse);
    return of(authResponse).pipe(delay(500));
  }

  register(data: RegisterData): Observable<AuthResponse> {
    const user: User = {
      id: (Date.now()).toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: (data.role || 'customer').toLowerCase() as 'customer' | 'seller' | 'admin',
      createdAt: new Date().toISOString()
    };
    const authResponse: AuthResponse = {
      user: user,
      token: 'mock_token_' + Date.now()
    };
    this.setAuth(authResponse);
    return of(authResponse).pipe(delay(500));
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
