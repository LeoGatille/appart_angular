import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageEditComponent } from './vintage-edit.component';

describe('VintageEditComponent', () => {
  let component: VintageEditComponent;
  let fixture: ComponentFixture<VintageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VintageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
