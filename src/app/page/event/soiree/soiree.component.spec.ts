import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoireeComponent } from './soiree.component';

describe('SoireeComponent', () => {
  let component: SoireeComponent;
  let fixture: ComponentFixture<SoireeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoireeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoireeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
