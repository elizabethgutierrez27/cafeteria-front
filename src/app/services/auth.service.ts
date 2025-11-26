import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';

interface LoginResp { token: string; user: any }

@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginResp>(`${this.api}/auth/login`, { email, password });
  }
  register(name: string, email: string, password: string) {
    return this.http.post(`${this.api}/auth/register`, { name, email, password });
  }

  setToken(t: string) { localStorage.setItem('token', t); }
  get token() { return localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); }

  get currentUser() {
  const t = this.token;
  if (!t) return null;
  try {
    return (jwtDecode as unknown as (token: string) => any)(t);
  } catch {
    return null;
  }
}
  isLoggedIn() { return !!this.currentUser; }
  isAdmin() { return this.currentUser?.role === 'admin'; }

}


