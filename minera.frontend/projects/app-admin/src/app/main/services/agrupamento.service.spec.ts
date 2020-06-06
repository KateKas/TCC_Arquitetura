import { TestBed } from '@angular/core/testing';

import { AgrupamentoService } from './agrupamento.service';

describe('AgrupamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgrupamentoService = TestBed.get(AgrupamentoService);
    expect(service).toBeTruthy();
  });
});
