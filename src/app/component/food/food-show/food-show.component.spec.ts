import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodShowComponent } from './food-show.component';

describe('FoodShowComponent', () => {
  let component: FoodShowComponent;
  let fixture: ComponentFixture<FoodShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
