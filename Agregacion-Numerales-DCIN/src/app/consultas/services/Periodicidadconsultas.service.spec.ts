import { TestBed } from '@angular/core/testing';

import { PeriodicidadConsultasService } from './PeriodicidadConsultas.service';

describe('ConsultasService', () => {
  let service: ConsultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodicidadConsultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
