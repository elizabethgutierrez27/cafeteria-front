import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '' }

];
