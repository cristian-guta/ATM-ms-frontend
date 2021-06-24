import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientModalComponent } from './new-client-modal.component';

describe('NewClientModalComponent', () => {
  let component: NewClientModalComponent;
  let fixture: ComponentFixture<NewClientModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
