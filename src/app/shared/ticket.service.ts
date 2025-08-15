import { Injectable, inject } from '@angular/core';
import { Flight } from './flight.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


export type Ticket = {
  id: number, user_id: number, flight_id: number, locator: string, seats: number, status: 'reserved'|'paid'|'canceled',
  flight?: Flight
}

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);

  create(flight_id: number, seats = 1){
    return this.http.post<Ticket>(`${API}/tickets`, { flight_id, seats });
  }

  mine() {
    return this.http.get<Ticket[]>(`${API}/tickets/mine`);
  }

  cancel(ticket: Ticket){
    return this.http.put(`${API}/tickets/${ticket.id}`, ticket);
  }
}
