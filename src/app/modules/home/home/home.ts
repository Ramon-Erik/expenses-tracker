import { Component, DestroyRef, inject } from '@angular/core';
import { InputDefault } from "../../../shared/components/inputs/input-default/input-default";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [InputDefault, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  #formBuilder = inject(FormBuilder)
  #destroyRef = inject(DestroyRef)

  public newMovimentationForm = this.#formBuilder.group({
    name: ['', Validators.required],
    dateBegin: [new Date().toISOString().substring(0, 10), Validators.required],
    dateEnd: ['', Validators.required],
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
      if (value.name && value.name.length > 0)
        this.showNewMovimentationForm = true
      else
        this.showNewMovimentationForm = false
    })
  }

}
