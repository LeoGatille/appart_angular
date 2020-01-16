import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListPageComponent } from './food-list-page.component';

describe('FoodListPageComponent', () => {
  let component: FoodListPageComponent;
  let fixture: ComponentFixture<FoodListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
