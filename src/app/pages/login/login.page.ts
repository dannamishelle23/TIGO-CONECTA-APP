import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonItem, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, RouterLink, CommonModule, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';
  // role selector removed; routing will use the server-side role

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      // 1. LOGIN
      const { user } = await this.auth.login(this.email, this.password);
      
      if (!user) throw new Error("No se pudo iniciar sesión");

      // 2. OBTENER EL PERFIL/ROL REAL DESDE SUPABASE
      const profile = await this.auth.loadUserProfile(user.id);
      const realRole = profile?.rol || 'usuario_registrado';

      // 3. NAVEGAR SEGÚN ROL REAL
      if (realRole === 'usuario_registrado') {
        this.router.navigateByUrl('/tabs/planes');
        return;
      }

      if (realRole === 'asesor_comercial') {
        this.router.navigateByUrl('/tabs/dashboard-asesor');
        return;
      }

    } catch (e) {
      console.error(e);
    }
  }
}
