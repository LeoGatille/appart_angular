import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAutoComponent } from './category-auto.component';

describe('CategoryAutoComponent', () => {
  let component: CategoryAutoComponent;
  let fixture: ComponentFixture<CategoryAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
