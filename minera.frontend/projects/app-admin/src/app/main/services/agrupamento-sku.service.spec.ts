import { TestBed } from '@angular/core/testing';

import { SkuService } from './filters.service';

describe('SkuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkuService = TestBed.get(SkuService);
    expect(service).toBeTruthy();
  });
});
