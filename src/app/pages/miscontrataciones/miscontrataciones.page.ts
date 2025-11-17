import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-miscontrataciones',
  templateUrl: './miscontrataciones.page.html',
  imports: [CommonModule, IonicModule],
})
export class MisContratacionesPage implements OnInit {
  contrataciones: any[] = [];
  userId: string | null = null;

  constructor(
    private supabase: SupabaseService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.auth.getUser().subscribe(async (user) => {
      if (user) {
        this.userId = user.id;
        const { data } = await this.supabase.supabase
          .from('contrataciones')
          .select('*')
          .eq('user_id', this.userId);
        this.contrataciones = data || [];
      }
    });
  }
}

