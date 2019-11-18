import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonsumComponent } from './konsum.component';

describe('KonsumComponent', () => {
  let component: KonsumComponent;
  let fixture: ComponentFixture<KonsumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonsumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
