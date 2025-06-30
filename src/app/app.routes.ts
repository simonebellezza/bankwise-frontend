import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Home } from './layout/home/home';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'register', component: Register, canActivate: [LoginGuard] }, // Register
  { path: 'login', component: Login, canActivate: [LoginGuard] }, // Login
  { path: '', component: Home, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  ] },
];
