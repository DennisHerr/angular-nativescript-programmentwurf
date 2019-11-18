import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrichlisteComponent } from './strichliste.component';

describe('StrichlisteComponent', () => {
  let component: StrichlisteComponent;
  let fixture: ComponentFixture<StrichlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrichlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrichlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
