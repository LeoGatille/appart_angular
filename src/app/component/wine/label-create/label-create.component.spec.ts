import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelCreateComponent } from './label-create.component';

describe('LabelCreateComponent', () => {
  let component: LabelCreateComponent;
  let fixture: ComponentFixture<LabelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
