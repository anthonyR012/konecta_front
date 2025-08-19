import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";


export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    if(!isPlatformBrowser(platformId)) return true;
    return sessionStorage.getItem('auth_token') ? router.parseUrl('/dashboard') : true;
}