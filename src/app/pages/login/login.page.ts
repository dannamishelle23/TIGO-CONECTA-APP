import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonItem, IonInput, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, IonSelect, IonSelectOption, RouterLink, CommonModule, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';
  role = ''; // se elige en el combo box

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      // 1. LOGIN
      const { user } = await this.auth.login(this.email, this.password);
      
      if (!user) throw new Error("No se pudo iniciar sesión");

      // 2. OBTENER ROL REAL DESDE SUPABASE
      const userData = await this.auth.getUserRole(user.id);

      if (!userData) throw new Error("Usuario sin rol en la BD");

      const realRole = userData.rol;

      // 3. VALIDAR CON LO QUE ELIGIÓ EN EL COMBO
      if (this.role !== realRole) {
        alert("El rol seleccionado no coincide con tu cuenta.");
        return;
      }

      // 4. NAVEGAR SEGÚN ROL
      if (realRole === 'usuario_registrado') {
        this.router.navigateByUrl('/tabs/planes');
      }

      if (realRole === 'asesor_comercial') {
        this.router.navigateByUrl('/tabs/dashboard-asesor');
      }

    } catch (e) {
      console.error(e);
    }
  }
}
