
import { isPlatformBrowser } from "@angular/common";
import { HttpInterceptorFn } from "@angular/common/http";
import { PLATFORM_ID, inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID)
    const hasSessionStorage = isPlatformBrowser(platformId);
    const token = hasSessionStorage ? sessionStorage.getItem('auth_token') : null;
    if (!token) return next(req);
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(authReq);
}