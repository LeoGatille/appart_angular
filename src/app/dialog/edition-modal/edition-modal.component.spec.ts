import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionModalComponent } from './edition-modal.component';

describe('EditionModalComponent', () => {
  let component: EditionModalComponent;
  let fixture: ComponentFixture<EditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
