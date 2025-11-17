import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class TabsPage implements OnInit {
  role: string = 'invitado';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getRole().subscribe(role => {
      this.role = role;
    });
  }
}

