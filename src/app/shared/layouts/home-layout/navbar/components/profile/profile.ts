import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth/auth.service';
import { catchError, of, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  #authService = inject(AuthService)
  #router = inject(Router)
  public openProfileOptions() {}
  public logout() {
    this.#authService.logout().pipe(
      take(1),
      catchError(error => {
        console.error('Erro ao fazer logout:', error);
        return of(null)
      })
    ).subscribe(logout => 
      this.#router.navigate(['/login'])
    )
  }
}
