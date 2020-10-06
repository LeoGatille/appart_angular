import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterBoxComponent } from './router-box.component';

describe('RouterBoxComponent', () => {
  let component: RouterBoxComponent;
  let fixture: ComponentFixture<RouterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
