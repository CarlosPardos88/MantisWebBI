import { TestBed } from '@angular/core/testing';

import { CertificarprocesosService } from './certificarprocesos.service';

describe('CertificarprocesosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificarprocesosService = TestBed.get(CertificarprocesosService);
    expect(service).toBeTruthy();
  });
});
