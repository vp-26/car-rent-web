import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Constant } from 'src/app/shared/constants/constant';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem(Constant.LOGIN);
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
 
  return true;
};