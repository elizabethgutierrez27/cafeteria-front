import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  displayedColumns = ['id', 'customer', 'total_price', 'status', 'actions'];

  constructor(private api: ApiService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.allOrders().subscribe(res => this.orders = res);
  }

  updateOrderStatus(id: number, status: string) {
    this.api.updateOrderStatus(id, status).subscribe({
      next: () => {
        this.snack.open(`Pedido ${status}`, 'OK', { duration: 1500 });
        this.load();  
      },
      error: err => {
        this.snack.open('Error actualizando pedido', 'Cerrar', { duration: 2000 });
      }
    });
  }


}
