import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinzahlungComponent } from './einzahlung.component';

describe('EinzahlungComponent', () => {
  let component: EinzahlungComponent;
  let fixture: ComponentFixture<EinzahlungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinzahlungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinzahlungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
