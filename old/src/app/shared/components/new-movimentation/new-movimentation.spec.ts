import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovimentation } from './new-movimentation';

describe('NewMovimentation', () => {
  let component: NewMovimentation;
  let fixture: ComponentFixture<NewMovimentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovimentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMovimentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
