import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
  path: 'inicio',
  loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.tabsRoutes),
  },
  {
    path: 'planes',
    loadComponent: () => import('./pages/planes/planes.page').then( m => m.PlanesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'miscontrataciones',
    loadComponent: () => import('./pages/miscontrataciones/miscontrataciones.page').then( m => m.MisContratacionesPage)
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
