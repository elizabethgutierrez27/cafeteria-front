import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSlideToggleModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(public cart: CartService, private api: ApiService, private router: Router, private snack: MatSnackBar) {}

  placeOrder() {
    const items = this.cart.items.map(i => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty }));
    const total = this.cart.total();
    this.api.createOrder(items, total).subscribe({
      next: () => {
        this.snack.open('Pedido realizado 🎉', 'OK', { duration: 1500 });
        this.cart.clear();
        this.router.navigate(['/my-orders']);
      },
      error: (e) => this.snack.open(e.error?.message || 'Error al crear pedido', 'OK', { duration: 2000 })
    });
  }
}
