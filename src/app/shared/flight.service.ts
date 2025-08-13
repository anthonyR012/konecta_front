import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


export type Flight = {
  id: number, code: string, origin: string, destination: string,
  departure_at:string, seats_total: number, seats_available: number, price: number 
};

const API = environment.api;

@Injectable({ providedIn: 'root'})
export class FlightService {
  private http = inject(HttpClient);

  list(){
    return this.http.get<Flight[]>(`${API}/flights`);
  }

}
