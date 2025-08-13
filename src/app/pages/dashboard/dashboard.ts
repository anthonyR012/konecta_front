import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Ticket, TicketService } from '../../shared/ticket.service';
import { Flight, FlightService } from '../../shared/flight.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private auth = inject(AuthService);
  private router = inject(Router);
  private ticketsApi = inject(TicketService);
  private flightsApi = inject(FlightService);

  userSign = this.auth.user;
  flights = signal<Flight[]>([]);
  tickets = signal<Ticket[]>([]);
  loading = signal(false);
  message = signal<string | null>(null);

  ngOnInit() {
    this.loading.set(true);
    this.flightsApi.list().subscribe({
      next: (rows) => this.flights.set(rows),
      complete: () => this.loading.set(false)
    }) 
    
    if (!this.auth.user()) {
      this.auth.fetchMe().subscribe({ error: () => this.router.navigateByUrl('/login') });
    }
  }

  reserve(flight: Flight){
    this.loading.set(true);
    this.ticketsApi.create(flight.id, 1).subscribe({
      next:(ticket) => {
        this.message.set(`Reserva creada. Localizador: ${ticket.locator}`);
        this.ticketsApi.mine().subscribe({ next: (rows) => this.tickets.set(rows)});
        this.flightsApi.list().subscribe({ next: (rows) => this.flights.set(rows)});
      },
      error: (e) => this.message.set(e?.error?.message ?? 'No se pudo reservar'),
      complete: () => this.loading.set(false)
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
