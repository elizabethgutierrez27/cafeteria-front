import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
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
  selector: 'app-cart',
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
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(public cart: CartService, private router: Router) {}

  inc(item: any) {
  const list = this.cart.items;
  const idx = list.findIndex(x => x.id === item.id);
  if (idx >= 0) list[idx].qty += 1;
  this.cart.items = list; // fuerza que se actualice en localStorage y Angular detecte cambio
}

dec(item: any) {
  const list = this.cart.items;
  const idx = list.findIndex(x => x.id === item.id);
  if (idx >= 0) list[idx].qty = Math.max(1, list[idx].qty - 1);
  this.cart.items = list; // fuerza actualización
}

remove(id: number) {
  this.cart.items = this.cart.items.filter(i => i.id !== id);
}

goCheckout() { this.router.navigate(['/checkout']); }

}
