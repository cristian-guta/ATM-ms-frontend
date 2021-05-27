import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEmotionsComponent } from './client-emotions.component';

describe('ClientEmotionsComponent', () => {
  let component: ClientEmotionsComponent;
  let fixture: ComponentFixture<ClientEmotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEmotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
