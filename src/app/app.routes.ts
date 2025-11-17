import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'planes',
    loadComponent: () => import('./planes/planes.page').then( m => m.PlanesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'miscontrataciones',
    loadComponent: () => import('./pages/miscontrataciones/miscontrataciones.page').then( m => m.MiscontratacionesPage)
  },
  {
    path: 'dashboard-asesor',
    loadComponent: () => import('./pages/dashboard-asesor/dashboard-asesor.page').then( m => m.DashboardAsesorPage)
  },
  {
    path: 'crear-editar-plan',
    loadComponent: () => import('./pages/crear-editar-plan/crear-editar-plan.page').then( m => m.CrearEditarPlanPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'plan-detalle',
    loadComponent: () => import('./pages/plan-detalle/plan-detalle.page').then( m => m.PlanDetallePage)
  },
];
