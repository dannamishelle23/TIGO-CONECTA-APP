import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RoleGuard } from '../core/guards/role-guard';
import { AuthGuard } from '../core/guards/auth-guard';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'planes',
        loadComponent: () => import('../pages/planes/planes.page').then(m => m.PlanesPage),
      },
      {
        path: 'plan-detalle/:id',
        loadComponent: () =>
          import('../pages/plan-detalle/plan-detalle.page').then(m => m.PlanDetallePage),
      },
      {
        path: 'mis-contrataciones',
        canActivate: [RoleGuard],
        data: { roles: ['usuario_registrado'] },
        loadComponent: () =>
          import('../pages/miscontrataciones/miscontrataciones.page').then(m => m.MisContratacionesPage),
      },
      {
        path: 'chat',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../pages/chat/chat.page').then(m => m.ChatPage),
      },
      {
        path: 'dashboard-asesor',
        canActivate: [RoleGuard],
        data: { roles: ['asesor_comercial'] },
        loadComponent: () =>
          import('../pages/dashboard-asesor/dashboard-asesor.page').then(m => m.DashboardAsesorPage),
      },
      {
        path: 'crear-editar-plan',
        canActivate: [RoleGuard],
        data: { roles: ['asesor_comercial'] },
        loadComponent: () =>
          import('../pages/crear-editar-plan/crear-editar-plan.page').then(m => m.CrearEditarPlanPage),
      },
      {
        path: '',
        redirectTo: 'planes',
        pathMatch: 'full',
      }
    ],
  }
];
