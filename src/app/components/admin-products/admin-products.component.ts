import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
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
  selector: 'app-admin-products',
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
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  selected: any = { name: '', description: '', price: 0, image_url: '', active: true };
  displayedColumns = ['id', 'name', 'price', 'active', 'actions'];
  editingId: number | null = null;

  constructor(private api: ApiService, private snack: MatSnackBar) {}

  load() { this.api.listProducts().subscribe(res => this.products = res); }

  ngOnInit(): void { this.load(); }

  edit(p: any) { this.editingId = p.id; this.selected = { ...p }; }
  cancel() { this.editingId = null; this.selected = { name: '', description: '', price: 0, image_url: '', active: true }; }

  save() {
    if (this.editingId) {
      this.api.updateProduct(this.editingId, this.selected).subscribe({
        next: () => { this.snack.open('Actualizado', 'OK', { duration: 1200 }); this.cancel(); this.load(); }
      });
    } else {
      this.api.createProduct(this.selected).subscribe({
        next: () => { this.snack.open('Creado', 'OK', { duration: 1200 }); this.cancel(); this.load(); }
      });
    }
  }

  remove(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => { this.snack.open('Eliminado', 'OK', { duration: 1200 }); this.load(); }
    });
  }
}