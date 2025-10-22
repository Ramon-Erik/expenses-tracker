import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const userTokwn = localStorage.getItem('refreshToken')

  return authService.user$.pipe(
    take(1),
    map((user) => {
      if (user && user.uid && userTokwn) {
        router.navigate(['/'])
        return false
      } 
      return true
    })
  );
};
