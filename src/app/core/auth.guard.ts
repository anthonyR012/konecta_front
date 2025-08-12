import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasToken = !!localStorage.getItem('auth_token');
  if (hasToken) return true;

  router.navigateByUrl('/login');
  return false;
};
