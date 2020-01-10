import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListPageComponent } from './category-list-page.component';

describe('CategoryListPageComponent', () => {
  let component: CategoryListPageComponent;
  let fixture: ComponentFixture<CategoryListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
