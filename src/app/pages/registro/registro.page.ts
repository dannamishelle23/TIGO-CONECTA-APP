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
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, RouterLink, CommonModule, FormsModule],
})
export class RegistroPage {
  nombres = '';
  email = '';
  telefono = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async registrar() {
    try {
      await this.auth.register(this.email, this.password, this.nombres, this.telefono);
      this.router.navigateByUrl('/tabs/planes');
    } catch (e) {
      console.error(e);
    }
  }
}

