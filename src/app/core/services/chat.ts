import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private supabase: SupabaseService) {}

  /* ---------- OBTENER MENSAJES ---------- */
  async getMessages(conversationId: string) {
    const { data, error } = await this.supabase.supabase
      .from('mensajes_chat')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  /* ---------- ENVIAR MENSAJE ---------- */
  async sendMessage(convId: string, fromUser: string, message: string) {
    const { error } = await this.supabase.supabase
      .from('mensajes_chat')
      .insert([
        {
          conversation_id: convId,
          from_user: fromUser,
          message,
        },
      ]);

    if (error) throw error;
  }

  /* ---------- SUBSCRIBE REALTIME ---------- */
  subscribeToMessages(conversationId: string, callback: Function) {
    return this.supabase.supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes_chat',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  }
}
