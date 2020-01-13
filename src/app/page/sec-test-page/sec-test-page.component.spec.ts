import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecTestPageComponent } from './sec-test-page.component';

describe('SecTestPageComponent', () => {
  let component: SecTestPageComponent;
  let fixture: ComponentFixture<SecTestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecTestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
