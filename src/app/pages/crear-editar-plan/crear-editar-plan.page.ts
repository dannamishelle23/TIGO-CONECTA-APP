import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from '../../core/services/plan';

@Component({
  standalone: true,
  selector: 'app-crear-editar-plan',
  templateUrl: './crear-editar-plan.page.html',
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CrearEditarPlanPage implements OnInit {
  id: number | null = null;
  isEditing = false;
  plan: any = {
    nombre: '',
    precio: 0,
    descripcion: '',
    activo: true,
  };

  imagenFile: File | null = null;
  oldImagePath: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEditing = true;
      const planes = await this.planService.getPlanes();
      const p = planes.find((pl) => pl.id === this.id);

      if (p) {
        this.plan = {
          nombre: p.nombre,
          precio: p.precio,
          descripcion: p.descripcion,
          activo: p.activo,
        };
        this.oldImagePath = p.imagen_path;
      }
    }
  }

  onImageSelected(event: any) {
    this.imagenFile = event.target.files[0];
  }

  async guardar() {
    try {
      if (this.isEditing) {
        await this.planService.updatePlan(
          this.id!,
          this.plan,
          this.imagenFile || undefined,
          this.oldImagePath || undefined
        );
      } else {
        await this.planService.createPlan(this.plan, this.imagenFile || undefined);
      }

      this.navCtrl.navigateBack('/tabs/dashboard-asesor');
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  }
}
