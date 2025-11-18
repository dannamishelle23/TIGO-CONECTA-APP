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
  
  // Espera a que la sesión cargue
  let currentRole = await firstValueFrom(this.auth.getRole());

  if (!currentRole || currentRole === 'invitado') {
    await new Promise(res => setTimeout(res, 200));
    currentRole = await firstValueFrom(this.auth.getRole());
  }

  if (!expectedRoles.includes(currentRole)) {
    this.router.navigateByUrl('/tabs/planes');
    return false;
  }

  return true;
}
}
