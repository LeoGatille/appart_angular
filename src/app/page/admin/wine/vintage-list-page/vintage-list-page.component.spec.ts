import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VintageListPageComponent } from './vintage-list-page.component';

describe('VintageListPageComponent', () => {
  let component: VintageListPageComponent;
  let fixture: ComponentFixture<VintageListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VintageListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VintageListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
