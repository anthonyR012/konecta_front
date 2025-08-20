import { Component, inject, signal } from '@angular/core';
import { Ticket, TicketService } from '../../shared/ticket.service';
import { CommonModule } from '@angular/common';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule, Spinner],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss'
})
export class Tickets {
  private ticketsApi = inject(TicketService);
  tickets = signal<Ticket[]>([]);
  loading = signal(false);
  message = signal<string | null>(null);


  ngOnInit() {
    this.loading.set(true);
    this.ticketsApi.mine().subscribe({ next: (rows) => this.tickets.set(rows),
      error : (e) => this.message.set(e?.error?.message ?? 'No se pudo obtener los tiquetes'),
      complete: () => this.loading.set(false) });
  }


  submit(ticket: Ticket, status: 'reserved' | 'paid' | 'canceled') {
    ticket.status = status;
    this.loading.set(true);
    this.ticketsApi.update(ticket).subscribe({
      next: () => {
        this.message.set('Tiquete cancelado');
        this.ticketsApi.mine().subscribe({ next: (rows) => this.tickets.set(rows), });
      },
      complete: () => this.loading.set(false),
      error: (e) => this.message.set(e?.error?.message ?? 'No se pudo cancelar el tiquete')
    });
    this.loading.set(false);

  }

}
