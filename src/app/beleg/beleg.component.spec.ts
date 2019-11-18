import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelegComponent } from './beleg.component';

describe('BelegComponent', () => {
  let component: BelegComponent;
  let fixture: ComponentFixture<BelegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
