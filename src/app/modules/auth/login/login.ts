import { Component, Input } from '@angular/core';
import { Logo } from "../../../shared/components/logo/logo";
import { InputDefault } from '../../../shared/components/inputs/input-default/input-default';

@Component({
  selector: 'app-login',
  imports: [Logo, InputDefault],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
