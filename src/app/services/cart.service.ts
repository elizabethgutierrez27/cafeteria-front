import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'cart_items';

  get items(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  set items(v: any[]) {
    localStorage.setItem(this.key, JSON.stringify(v));
  }

  add(item: any) {
    const list = this.items;
    const idx = list.findIndex((x: any) => x.id === item.id);
    if (idx >= 0) list[idx].qty += 1;
    else list.push({ ...item, qty: 1 });
    this.items = list;
  }

  remove(id: number) {
    this.items = this.items.filter((x: any) => x.id !== id);
  }

  clear() { localStorage.removeItem(this.key); }

  total(): number {
    return this.items.reduce((s: number, x: any) => s + x.price * x.qty, 0);
  }

  count(): number {
    return this.items.reduce((s: number, x: any) => s + x.qty, 0);
  }
}
