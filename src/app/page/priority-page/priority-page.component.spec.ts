import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityPageComponent } from './priority-page.component';

describe('PriorityPageComponent', () => {
  let component: PriorityPageComponent;
  let fixture: ComponentFixture<PriorityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
