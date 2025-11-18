import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase';

@Component({
  standalone: true,
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, CommonModule, FormsModule],
})
export class RecuperarPage {
  email = '';
  enviado = false;
  cargando = false;
  error = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async recuperarContrasena() {
    if (!this.email) {
      this.error = 'Por favor ingresa tu correo electrónico';
      return;
    }

    this.cargando = true;
    this.error = '';

    try {
      const { error } = await this.supabase.supabase.auth.resetPasswordForEmail(this.email);

      if (error) {
        this.error = error.message;
      } else {
        this.enviado = true;
      }
    } catch (e: any) {
      this.error = e.message || 'Error al enviar el enlace de recuperación';
    } finally {
      this.cargando = false;
    }
  }

  volver() {
    this.router.navigateByUrl('/login');
  }
}
