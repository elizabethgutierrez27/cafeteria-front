import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class ApiService {
  api = 'http://localhost:3000';
  constructor(private http: HttpClient, private auth: AuthService) {}

  // Productos
    listProducts() { return this.http.get<any[]>(`${this.api}/products`); }
    createProduct(p: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.post(`${this.api}/products`, p, { headers });
    }
    updateProduct(id: number, p: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.put(`${this.api}/products/${id}`, p, { headers });
    }
    deleteProduct(id: number) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.delete(`${this.api}/products/${id}`, { headers });
    }

  // Pedidos
    createOrder(items: any[], total_price: number) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`   
        });
        return this.http.post(`${this.api}/orders`, { items, total_price }, { headers });
    }

    myOrders() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.get<any[]>(`${this.api}/orders/my`, { headers });
    }

    allOrders() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.get<any[]>(`${this.api}/orders`, { headers });
    }

    updateOrderStatus(id: number, status: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.token}`
        });
        return this.http.patch(`${this.api}/orders/${id}/status`, { status }, { headers });
    }

}
