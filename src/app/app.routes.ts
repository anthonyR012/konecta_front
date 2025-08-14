import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth.guard';
import { guestGuard } from './core/guest.guard';
import { Flights } from './pages/flights/flights';
import { Tickets } from './pages/tickets/tickets';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: 'flights', component: Flights },
      { path: 'my-tickets', component: Tickets },
      { path: '', redirectTo: 'flights', pathMatch: 'full' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
