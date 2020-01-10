import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageAutoComponent } from './vintage-auto.component';

describe('VintageAutoComponent', () => {
  let component: VintageAutoComponent;
  let fixture: ComponentFixture<VintageAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VintageAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
