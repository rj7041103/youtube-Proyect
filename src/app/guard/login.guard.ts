import { inject } from '@angular/core';
import { AppserviceService } from '../../service/appservice.service';
import { CanActivateFn, Router } from '@angular/router';

export const LoginGuard: CanActivateFn = (route, state) => {
  const service = inject(AppserviceService);
  const router = inject(Router);
  if (localStorage.getItem('currentUser')) {
    router.navigateByUrl('');
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
