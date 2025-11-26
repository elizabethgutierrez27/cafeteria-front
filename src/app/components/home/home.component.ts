import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-home',
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
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = [];
  loading = true;
  searchTerm: string = '';


  constructor(private api: ApiService, private cart: CartService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.api.listProducts().subscribe({
      next: (res) => { this.products = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addToCart(p: any) {
    this.cart.add(p);
    this.snack.open('Agregado al carrito', 'OK', { duration: 1200 });
  }

  filteredProducts() {
    if (!this.searchTerm) return this.products;
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p => p.name.toLowerCase().includes(term));
  }
}
