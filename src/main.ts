
import './app/features/home/home.component';
import './app/features/products/products.component';
import './app/features/product-details/product-details.component';
import './app/features/cart/cart.component';
import './app/features/checkout/checkout.component';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(App, appConfig);
