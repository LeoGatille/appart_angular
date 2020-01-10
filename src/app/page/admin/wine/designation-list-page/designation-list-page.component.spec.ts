import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationListPageComponent } from './designation-list-page.component';

describe('DesignationListPageComponent', () => {
  let component: DesignationListPageComponent;
  let fixture: ComponentFixture<DesignationListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
