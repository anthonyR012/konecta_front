import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const hasToken = isPlatformBrowser(platformId) && !!localStorage.getItem('auth_token');
  if (hasToken) return true;

  router.navigateByUrl('/login');
  return false;
};
