import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCreatePageComponent } from './wine-create-page.component';

describe('WineCreatePageComponent', () => {
  let component: WineCreatePageComponent;
  let fixture: ComponentFixture<WineCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
