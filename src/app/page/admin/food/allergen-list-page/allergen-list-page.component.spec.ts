import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenListPageComponent } from './allergen-list-page.component';

describe('AllergenListPageComponent', () => {
  let component: AllergenListPageComponent;
  let fixture: ComponentFixture<AllergenListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergenListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergenListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
