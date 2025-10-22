import { Component, inject } from '@angular/core';
import { Logo } from "../../../shared/components/logo/logo";
import { InputDefault } from '../../../shared/components/inputs/input-default/input-default';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Logo, InputDefault, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  #fb = inject(FormBuilder)
  #authService = inject(AuthService)
  #router = inject(Router)

  public authError: string | null  = null
  public loading = false;

  public loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  public login() {
    this.loading = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value!
      const password = this.loginForm.controls['password'].value!
      this.#authService.login(email, password)
        .pipe(
          take(1)
        )
        .subscribe({
          next: () => {
            this.#router.navigate(['/home'])
          },
          complete: () => {
            this.loading = false;
          }
        })
    }
  }
}
