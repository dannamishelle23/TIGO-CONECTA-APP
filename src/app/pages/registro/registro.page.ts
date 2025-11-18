import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonItem, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, RouterLink, CommonModule, FormsModule],
})
export class RegistroPage {
  nombres = '';
  email = '';
  telefono = '';
  password = '';
  loading = false;
  success = false;
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  async registrar() {
    this.loading = true;
    this.message = '';
    if (!this.nombres || !this.telefono || !this.email || !this.password) {
      this.message = 'Por favor completa todos los campos';
      this.loading = false;
      return;
    }
    try {
      console.log('Iniciando registro con:', { email: this.email, nombres: this.nombres, telefono: this.telefono });
      await this.auth.register(this.email, this.password, this.nombres, this.telefono);
      this.success = true;
      this.message = 'Cuenta creada con éxito. Redirigiendo al inicio de sesión...';
      console.log('Registro exitoso');
      // redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    } catch (e: any) {
      console.error('Error capturado en registro.page:', e);
      this.message = e?.message || 'Error al crear la cuenta';
      this.success = false;
    } finally {
      this.loading = false;
    }
  }
}

