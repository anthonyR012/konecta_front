import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "../../environments/environment";

type LoginBody = { email: string; password: string };
type RegisterBody = { name: string; email: string; password: string };
type User = { id: number, name: string; email: string; role: string };
type LoginResponse = {
    user: User,
    token: string
};

const TOKEN_KEY = 'auth_token';
const API = environment.api;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private http = inject(HttpClient);
    user = signal<User | null>(null);
    isAuthenticated = false;

    login(body: LoginBody) {
        return this.http.post<LoginResponse>(`${API}/auth/login`, body).pipe(
            tap(res => {
                sessionStorage.setItem(TOKEN_KEY, res.token);
            })
        );
    }

    register(body: RegisterBody){
        return this.http.post<LoginResponse>(`${API}/auth/register`, body).pipe(
            tap(res => {
                sessionStorage.setItem(TOKEN_KEY, res.token);
            })
        );
    }

    fetchMe() {
        return this.http.get<User>(`${API}/auth/me`).pipe(
            tap(u => this.user.set(u))
        );
    }

    logout() {
        this.http.post(`${API}/auth/logout`, {}).subscribe({ error: () => { } })
        sessionStorage.removeItem(TOKEN_KEY);
    }

    get token() { return sessionStorage.getItem(TOKEN_KEY); }
    isLoggedIn() { return !!this.token; }
}