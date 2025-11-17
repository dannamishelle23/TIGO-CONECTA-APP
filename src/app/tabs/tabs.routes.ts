import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RoleGuard } from 'core/guards/role.guard';
import { AuthGuard } from 'core/guards/auth.guard';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'planes',
        loadComponent: () => import('../planes/planes.page').then(m => m.PlanesPage),
      },
      {
        path: 'plan-detalle/:id',
        loadComponent: () =>
          import('../plan-detalle/plan-detalle.page').then(m => m.PlanDetallePage),
      },
      {
        path: 'mis-contrataciones',
        canActivate: [RoleGuard],
        data: { roles: ['usuario_registrado'] },
        loadComponent: () =>
          import('../mis-contrataciones/mis-contrataciones.page').then(m => m.MisContratacionesPage),
      },
      {
        path: 'chat',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../chat/chat.page').then(m => m.ChatPage),
      },
      {
        path: 'dashboard-asesor',
        canActivate: [RoleGuard],
        data: { roles: ['asesor_comercial'] },
        loadComponent: () =>
          import('../dashboard-asesor/dashboard-asesor.page').then(m => m.DashboardAsesorPage),
      },
      {
        path: 'crear-editar-plan',
        canActivate: [RoleGuard],
        data: { roles: ['asesor_comercial'] },
        loadComponent: () =>
          import('../crear-editar-plan/crear-editar-plan.page').then(m => m.CrearEditarPlanPage),
      },
      {
        path: '',
        redirectTo: 'planes',
        pathMatch: 'full',
      }
    ],
  }
];
