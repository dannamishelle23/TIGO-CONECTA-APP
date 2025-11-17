import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private bucket = 'planes-imagenes';

  constructor(private supabase: SupabaseService) {}

  /* ---------- LISTAR PLANES ---------- */
  async getPlanes() {
    const { data, error } = await this.supabase.supabase
      .from('planes_moviles')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data;
  }

  /* ---------- CREAR PLAN ---------- */
  async createPlan(plan: any, file?: File) {
    let imagePath = null;

    if (file) {
      imagePath = await this.uploadImage(file);
    }

    const { data, error } = await this.supabase.supabase
      .from('planes_moviles')
      .insert([{ ...plan, imagen_path: imagePath }])
      .select();

    if (error) throw error;
    return data;
  }

  /* ---------- ACTUALIZAR PLAN ---------- */
  async updatePlan(id: number, plan: any, file?: File, oldImage?: string) {
    let imagePath = oldImage;

    if (file) {
      if (oldImage) {
        await this.deleteImage(oldImage);
      }
      imagePath = await this.uploadImage(file);
    }

    const { data, error } = await this.supabase.supabase
      .from('planes_moviles')
      .update({ ...plan, imagen_path: imagePath })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  /* ---------- ELIMINAR PLAN ---------- */
  async deletePlan(id: number, imagePath?: string) {
    if (imagePath) {
      await this.deleteImage(imagePath);
    }

    return this.supabase.supabase.from('planes_moviles').delete().eq('id', id);
  }

  /* ---------- CARGAR IMAGEN ---------- */
  private async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `planes/${uuidv4()}.${ext}`;

    const { error } = await this.supabase.supabase.storage
      .from(this.bucket)
      .upload(path, file);

    if (error) throw error;
    return path;
  }

  /* ---------- BORRAR IMAGEN ---------- */
  private async deleteImage(path: string) {
    await this.supabase.supabase.storage.from(this.bucket).remove([path]);
  }

  /* ---------- PUBLIC URL ---------- */
  getImageUrl(path: string) {
    return this.supabase.supabase.storage
      .from(this.bucket)
      .getPublicUrl(path).data.publicUrl;
  }
}
