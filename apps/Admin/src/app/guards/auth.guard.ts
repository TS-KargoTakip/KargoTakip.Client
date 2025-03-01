import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("accessToken")){
    return true;
  }

  const router = inject(Router);
  router.navigateByUrl("/login");
  return false;
};
