import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRservationComponent } from './add-rservation.component';

describe('AddRservationComponent', () => {
  let component: AddRservationComponent;
  let fixture: ComponentFixture<AddRservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
