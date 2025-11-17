import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../core/services/plan';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-crear-editar-plan',
  templateUrl: './crear-editar-plan.page.html',
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CrearEditarPlanPage implements OnInit {
  id: number | null = null;
  nombre = '';
  precio: number | null = null;
  descripcion = '';
  file: File | null = null;
  oldImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      const planes = await this.planService.getPlanes();
      const plan = planes.find((p: any) => p.id === this.id);

      this.nombre = plan.nombre;
      this.precio = plan.precio;
      this.descripcion = plan.descripcion;
      this.oldImage = plan.imagen_path;
    }
  }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  async guardar() {
    const data = {
      nombre: this.nombre,
      precio: this.precio,
      descripcion: this.descripcion,
    };

    if (this.id) {
      await this.planService.updatePlan(this.id, data, this.file!, this.oldImage!);
    } else {
      await this.planService.createPlan(data, this.file!);
    }

    this.nav.navigateBack('/tabs/dashboard-asesor');
  }
}
