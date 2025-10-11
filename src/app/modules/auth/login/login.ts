import { Component, inject, Input } from '@angular/core';
import { Logo } from "../../../shared/components/logo/logo";
import { InputDefault } from '../../../shared/components/inputs/input-default/input-default';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Logo, InputDefault, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  #fb = inject(FormBuilder)

  public loginForm = this.#fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  })

  public log() {
    console.log(this.loginForm);
    
  }
}
