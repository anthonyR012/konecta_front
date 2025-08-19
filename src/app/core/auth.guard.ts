import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID)
  if(isPlatformServer(platformId)) return true;
  return !!sessionStorage.getItem('auth_token') ? true : router.parseUrl('/login');
};
