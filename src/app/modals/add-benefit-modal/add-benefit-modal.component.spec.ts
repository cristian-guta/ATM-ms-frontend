import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenefitModalComponent } from './add-benefit-modal.component';

describe('AddBenefitModalComponent', () => {
  let component: AddBenefitModalComponent;
  let fixture: ComponentFixture<AddBenefitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBenefitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBenefitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
