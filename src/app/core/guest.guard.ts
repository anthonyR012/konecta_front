import { isPlatformServer } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";


export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    if(isPlatformServer(platformId)) return true;
    return sessionStorage.getItem('auth_token') ? router.parseUrl('/dashboard') : true;
}