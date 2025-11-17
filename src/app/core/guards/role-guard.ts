import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRoles = route.data['roles'] as string[];
    const currentRole = await firstValueFrom(this.auth.getRole());

    if (!expectedRoles.includes(currentRole)) {
      this.router.navigateByUrl('/tabs/planes'); 
      return false;
    }
    return true;
  }
}
