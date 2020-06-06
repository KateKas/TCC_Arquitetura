import { TestBed } from '@angular/core/testing';

import { RelacaoAgrupamentoService } from './relacao-agrupamento.service';

describe('RelacaoAgrupamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacaoAgrupamentoService = TestBed.get(RelacaoAgrupamentoService);
    expect(service).toBeTruthy();
  });
});
