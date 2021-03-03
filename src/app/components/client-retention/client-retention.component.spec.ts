import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRetentionComponent } from './client-retention.component';

describe('ClientRetentionComponent', () => {
  let component: ClientRetentionComponent;
  let fixture: ComponentFixture<ClientRetentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRetentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
