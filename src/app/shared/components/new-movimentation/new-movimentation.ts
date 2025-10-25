import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputDefault } from "../inputs/input-default/input-default";


@Component({
  selector: 'app-new-movimentation',
  imports: [ReactiveFormsModule, InputDefault],
  templateUrl: './new-movimentation.html',
  styleUrl: './new-movimentation.scss'
})
export class NewMovimentation {
  #formBuilder = inject(FormBuilder)
  #destroyRef = inject(DestroyRef)

  public currentDate = new Date().toISOString().substring(0, 10)
  public newMovimentationForm = this.#formBuilder.group({
    name: ['', Validators.required],
    dateBegin: [this.currentDate, Validators.required],
    dateEnd: [this.currentDate, Validators.required],
    installments: ['', Validators.required],
    totalAmount: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    type: ['', Validators.required]
  })

  public showNewMovimentationForm = false 
  public loading = false

  ngOnInit() {
    this.newMovimentationForm.valueChanges.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(value => {
      console.log(value);
      
      if (value.name && value.name.length > 0)
        this.showNewMovimentationForm = true
      else
        this.showNewMovimentationForm = false
    })
  }
}
