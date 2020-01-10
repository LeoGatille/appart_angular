import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAutoComponent } from './label-auto.component';

describe('LabelAutoComponent', () => {
  let component: LabelAutoComponent;
  let fixture: ComponentFixture<LabelAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
