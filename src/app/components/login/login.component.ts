import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  name = '';
  isRegister = false;

  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) {}

  submit() {
    if (this.isRegister) {
      this.auth.register(this.name, this.email, this.password).subscribe({
        next: () => {
          this.snack.open('Registro exitoso, ahora inicia sesión', 'OK', { duration: 2000 });
          this.isRegister = false;
        },
        error: err => this.snack.open(err.error?.message || 'Error al registrar', 'OK', { duration: 2000 })
      });
    } else {
      this.auth.login(this.email, this.password).subscribe({
        next: (res) => {
          this.auth.setToken(res.token);
          this.snack.open('Bienvenido/a', 'OK', { duration: 1500 });
          this.router.navigateByUrl('/');
        },
        error: err => this.snack.open(err.error?.message || 'Credenciales inválidas', 'OK', { duration: 2000 })
      });
    }
  }
}


