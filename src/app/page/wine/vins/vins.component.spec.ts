import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinsComponent } from './vins.component';

describe('VinsComponent', () => {
  let component: VinsComponent;
  let fixture: ComponentFixture<VinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
