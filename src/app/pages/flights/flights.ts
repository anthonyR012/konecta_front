import { Component, effect, inject, signal } from '@angular/core';
import { Flight, FlightService, Paginated } from '../../shared/flight.service';
import { TicketService } from '../../shared/ticket.service';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-flights',
  imports: [CommonModule,Spinner],
  templateUrl: './flights.html',
  styleUrl: './flights.scss'
})
export class Flights {

  private auth = inject(AuthService);
  private router = inject(Router);
  private flightsApi = inject(FlightService);
  private ticketsApi = inject(TicketService);

  userSign = this.auth.user;
  flights = signal<Flight[]>([]);
  loading = signal(false);
  message = signal<string | null>(null);

  page = signal(1);
  perPage = signal(10);
  total = signal(0);
  lastPage = signal(1);
  origin = signal<string>('');
  destination = signal<string>('');
  date = signal<string>('');

  constructor(){
    effect(() =>{
      this.load();
    });
  }

  ngOnInit() {
    this.loading.set(true);
    this.load();
    if (!this.auth.user()) {
      this.auth.fetchMe().subscribe({ error: () => this.message.set('No se pudo obtener el usuario') });
    }
  }
  

  load(page = this.page(), per = this.perPage()) {
    this.loading.set(true);
     this.flightsApi.list({
      page,
      per_page: per,
      origin: this.origin() || undefined,
      destination: this.destination() || undefined,
      date: this.date() || undefined
    }).subscribe({
      next: (res: Paginated<Flight>) => {
        this.flights.set(res.data);
        this.page.set(res.current_page);
        this.perPage.set(res.per_page as any);
        this.total.set(res.total);
        this.lastPage.set(res.last_page);
      },
      error: (e) => this.message.set(e?.error?.message ?? 'Error cargando vuelos'),
      complete: () => this.loading.set(false)
    });
  }

  goPrev() { if (this.page() > 1) this.load(this.page() - 1); }
  goNext() { if (this.page() < this.lastPage()) this.load(this.page() + 1); }
  applyFilters() { this.page.set(1); this.load(1); }
  clearFilters() { this.origin.set(''); this.destination.set(''); this.date.set(''); this.page.set(1); this.load(1); }


  reserve(flight: Flight){
    this.loading.set(true);
    this.ticketsApi.create(flight.id, 1).subscribe({
      next:(ticket) => {
         this.message.set(`Reserva creada. Localizador: ${ticket.locator}`);
         this.load();
      },
      error: (e) => this.message.set(e?.error?.message ?? 'No se pudo reservar'),
      complete: () => this.loading.set(false)
    });
  }
}
