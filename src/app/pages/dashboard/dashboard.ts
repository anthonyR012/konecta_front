import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  logout() {
    window.localStorage.removeItem('auth_token');
    location.href = '/login';
  }

}
