import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDefault } from './input-default';

describe('InputDefault', () => {
  let component: InputDefault;
  let fixture: ComponentFixture<InputDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDefault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDefault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
