import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';


export type Flight = {
  id: number, 
  code: string,
  origin: string,
  destination: string,
  icon: string,
  departure_at:string,
  seats_total: number,
  seats_available: number,
  price: number 
};


export type Paginated<T> = {
  data: T[],
  first_page_url: string|null,
  last_page_url: string| null,
  prev_page_url: string | null,
  next_page_url: string | null,
  current_page: number;
  from: number|null;
  last_page: number;
  links: any[];
  path: string;
  per_page: number;
  to: number|null;
  total: number;
};


const API = environment.api;

@Injectable({ providedIn: 'root'})
export class FlightService {
  private http = inject(HttpClient);

  list(params: { page?: number; per_page?: number; origin?: string; destination?: string; date?: string } = {}) {
    let httpParams = new HttpParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && `${v}` !== '') httpParams = httpParams.set(k, `${v}`);
    }
    return this.http.get<Paginated<Flight>>(`${API}/flights`, { params: httpParams });
  }

}
