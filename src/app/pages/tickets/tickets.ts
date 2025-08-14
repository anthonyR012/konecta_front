import { Component, inject, signal } from '@angular/core';
import { Ticket, TicketService } from '../../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  imports: [],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss'
})
export class Tickets {
  private ticketsApi = inject(TicketService);
  tickets = signal<Ticket[]>([]);
  loading = signal(false);
  message = signal<string | null>(null);


  ngOnInit() {
    this.ticketsApi.mine().subscribe({ next: (rows) => this.tickets.set(rows)});
  }

}
