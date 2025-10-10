import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-default',
  imports: [],
  templateUrl: './input-default.html',
  styleUrl: './input-default.scss'
})
export class InputDefault {
  public id = input.required<string>();
  public type = input.required<string>();
  public label = input.required<string>();
  public isRequired = input(false);
  public placeholder = input('');
}
