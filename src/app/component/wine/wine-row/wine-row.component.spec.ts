import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineRowComponent } from './wine-row.component';

describe('WineRowComponent', () => {
  let component: WineRowComponent;
  let fixture: ComponentFixture<WineRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
