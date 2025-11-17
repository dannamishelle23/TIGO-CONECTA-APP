import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate() {
    const user = await firstValueFrom(this.auth.getUser());

    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
