import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCreateComponent } from './wine-create.component';

describe('WineCreateComponent', () => {
  let component: WineCreateComponent;
  let fixture: ComponentFixture<WineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
