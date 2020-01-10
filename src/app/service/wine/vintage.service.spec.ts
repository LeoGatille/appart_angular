import { TestBed } from '@angular/core/testing';

import { VintageService } from './vintage.service';

describe('VintageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VintageService = TestBed.get(VintageService);
    expect(service).toBeTruthy();
  });
});
