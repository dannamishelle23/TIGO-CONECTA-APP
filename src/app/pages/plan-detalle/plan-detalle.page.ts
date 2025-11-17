import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from '../../core/services/plan';

@Component({
  standalone: true,
  selector: 'app-plan-detalle',
  templateUrl: './plan-detalle.page.html',
  imports: [IonicModule, CommonModule],
})
export class PlanDetallePage implements OnInit {
  plan: any;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const planes = await this.planService.getPlanes();
    this.plan = planes.find((p: any) => p.id === id);
  }
}
