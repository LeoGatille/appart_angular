import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageCreateComponent } from './vintage-create.component';

describe('VintageCreateComponent', () => {
  let component: VintageCreateComponent;
  let fixture: ComponentFixture<VintageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VintageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
