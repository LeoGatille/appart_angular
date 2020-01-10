import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelListPageComponent } from './label-list-page.component';

describe('LabelListPageComponent', () => {
  let component: LabelListPageComponent;
  let fixture: ComponentFixture<LabelListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
