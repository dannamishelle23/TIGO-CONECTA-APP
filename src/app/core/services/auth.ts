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

    // Detecta cada cambio de sesión
    this.supabase.supabase.auth.onAuthStateChange(async (event, session) => {

      if (session?.user) {
        const userId = session.user.id;

        await this.ensureUserProfile(userId, session.user.email!);

        const perfil = await this.loadUserProfile(userId);

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

  /* -------------------- LOGIN -------------------- */
  async login(email: string, password: string) {
    const { data, error } = await this.supabase.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  /* -------------------- REGISTER -------------------- */
  async register(email: string, password: string, nombres?: string, telefono?: string) {

    const { data, error } = await this.supabase.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: '/login',
        data: {
          nombres: nombres || '',
          telefono: telefono || '',
        }
      }
    });

    if (error) throw error;

    // 🔥 IMPORTANTE:
    // NO intentamos insertar el perfil aquí
    // Supabase no devuelve `user.id` hasta que se confirma el correo

    return data;
  }

  /* -------------------- PERFIL -------------------- */

  // Crea perfil si no existe (se llama automáticamente al iniciar sesión)
  async ensureUserProfile(userId: string, email: string) {

    // Verifica si existe
    const { data: existing } = await this.supabase.supabase
      .from('usuarios')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (existing) {
      return; // Ya existe
    }

    // Si no existe, lo creamos
    const { error } = await this.supabase.supabase
      .from('usuarios')
      .insert([
        {
          id: userId,
          email: email,
          rol: 'usuario_registrado',
        }
      ]);

    if (error) console.error('Error creando perfil:', error);
  }

  async loadUserProfile(userId: string) {
    const { data } = await this.supabase.supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    return data;
  }

  async logout() {
    await this.supabase.supabase.auth.signOut();
  }
}
