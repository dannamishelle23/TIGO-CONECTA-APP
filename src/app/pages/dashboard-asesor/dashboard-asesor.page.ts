import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../core/services/plan';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard-asesor',
  templateUrl: './dashboard-asesor.page.html',
  imports: [IonicModule, CommonModule],
})
export class DashboardAsesorPage implements OnInit {
  planes: any[] = [];

  constructor(private planService: PlanService) {}

  async ngOnInit() {
    this.planes = await this.planService.getPlanes();
  }
}
