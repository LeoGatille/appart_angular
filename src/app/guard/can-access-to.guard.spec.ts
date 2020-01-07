import { TestBed, async, inject } from '@angular/core/testing';

import { CanAccessToGuard } from './can-access-to.guard';

describe('CanAccessToGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAccessToGuard]
    });
  });

  it('should ...', inject([CanAccessToGuard], (guard: CanAccessToGuard) => {
    expect(guard).toBeTruthy();
  }));
});
