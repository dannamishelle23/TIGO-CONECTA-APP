import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlanService } from '../../core/services/plan';

@Component({
  standalone: true,
  selector: 'app-planes',
  templateUrl: './planes.page.html',
  imports: [IonicModule, CommonModule],
})
export class PlanesPage implements OnInit {
  planes: any[] = [];

  constructor(private planService: PlanService) {}

  async ngOnInit() {
    this.planes = await this.planService.getPlanes();
  }
}
