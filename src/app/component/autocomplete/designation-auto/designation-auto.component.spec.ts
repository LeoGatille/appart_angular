import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationAutoComponent } from './designation-auto.component';

describe('DesignationAutoComponent', () => {
  let component: DesignationAutoComponent;
  let fixture: ComponentFixture<DesignationAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
