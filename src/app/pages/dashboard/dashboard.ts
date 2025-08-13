import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private auth = inject(AuthService);
  private router = inject(Router);

  userSign = this.auth.user;

  ngOnInit() {
    if (!this.auth.user()) {
      this.auth.fetchMe().subscribe({ error: () => this.router.navigateByUrl('/login') });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
