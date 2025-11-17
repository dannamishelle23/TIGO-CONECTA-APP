import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);
  private role$ = new BehaviorSubject<string>('invitado');

  constructor(private supabase: SupabaseService) {
    // Detecta cambios de sesión automáticamente
    this.supabase.supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const perfil = await this.loadUserProfile(session.user.id);
        this.user$.next(session.user);
        this.role$.next(perfil?.rol || 'usuario_registrado');
      } else {
        this.user$.next(null);
        this.role$.next('invitado');
      }
    });
  }

  getUser() {
    return this.user$.asObservable();
  }

  getRole() {
    return this.role$.asObservable();
  }

  /* ---------- AUTENTICACIÓN ---------- */
  async login(email: string, password: string) {
    const { data, error } = await this.supabase.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async register(email: string, password: string) {
    // Registro en Auth
    const { data, error } = await this.supabase.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Crear perfil en tabla usuarios con rol por defecto
    const user = data.user;

    if (user) {
      await this.supabase.supabase.from('usuarios').insert([
        {
          id: user.id,
          email,
          rol: 'usuario_registrado',
        },
      ]);
    }

    return data;
  }

  async logout() {
    await this.supabase.supabase.auth.signOut();
  }

  /* ---------- PERFIL ---------- */
  async loadUserProfile(userId: string) {
    const { data } = await this.supabase.supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();
    return data;
  }
}

