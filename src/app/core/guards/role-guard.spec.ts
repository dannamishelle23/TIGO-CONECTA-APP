import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RoleGuard } from './role-guard';
import { AuthService } from '../services/auth';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const auth = jasmine.createSpyObj('AuthService', ['getRole']);
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router },
      ],
    });

    guard = TestBed.inject(RoleGuard);
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
