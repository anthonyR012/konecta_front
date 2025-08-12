import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "../../environments/environment";

type LoginBody = { email: string; password: string };
type LoginResponse = {
    user: { id: number, name: string; email: string; role: string },
    token: string
};

const TOKEN_KEY = 'auth_token';
const API = environment.api;

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    login(body: LoginBody) {
        return this.http.post<LoginResponse>(`${API}/auth/login`, body).pipe(
            tap(res => localStorage.setItem(TOKEN_KEY, res.token))
        );
    }

    logout() {
        const token = localStorage.getItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY);
        if (!token) return;
        this.http.post(`${API}/auth/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({ error: () => { } })
    }

    get token() { return localStorage.getItem(TOKEN_KEY); }
    isLoggedIn() { return !!this.token; }
}