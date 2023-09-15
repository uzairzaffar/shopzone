import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

export const canActivate = (expectedRole: string, authService = inject(AuthService)) => {
    const userRole = authService.getUserRole();
    if (userRole && userRole === expectedRole) {
      return true;
    }
    return false;
};

const routes: Routes = [
  { path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [() => canActivate('admin')],
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
    canActivate: [() => canActivate('user')],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
