import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineEditComponent } from './wine-edit.component';

describe('WineEditComponent', () => {
  let component: WineEditComponent;
  let fixture: ComponentFixture<WineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
