import { Component, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-default',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDefault),
    multi: true
  }],
  imports: [FormsModule],
  templateUrl: './input-default.html',
  styleUrl: './input-default.scss'
})
export class InputDefault implements ControlValueAccessor {
  public id = input.required<string>();
  public type = input.required<string>();
  public label = input.required<string>();
  public isRequired = input(false);
  public placeholder = input('');

  public inputValue = '';

  protected onToutched? : () => {}
  protected onChange? : (value: string) => {}
  protected isDisabled = false
  
  writeValue(obj: string): void {
    this.inputValue = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onToutched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

}
