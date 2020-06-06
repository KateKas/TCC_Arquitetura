import { TestBed } from '@angular/core/testing';

import { AtributoService } from './atributo.service';

describe('AtributoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtributoService = TestBed.get(AtributoService);
    expect(service).toBeTruthy();
  });
});
