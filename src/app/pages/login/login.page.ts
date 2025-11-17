import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/tabs/planes');
    } catch (e) {
      console.error(e);
    }
  }
}

