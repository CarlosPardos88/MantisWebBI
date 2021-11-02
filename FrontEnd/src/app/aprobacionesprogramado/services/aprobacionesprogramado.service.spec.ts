import { TestBed } from '@angular/core/testing';

import { AprobacionesprogramadoService } from './aprobacionesprogramado.service';

describe('AprobacionesprogramadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprobacionesprogramadoService = TestBed.get(AprobacionesprogramadoService);
    expect(service).toBeTruthy();
  });
});
