import { TestBed } from '@angular/core/testing';

import { ConsultaagregacionService } from './consultaagregacion.service';

describe('ConsultaagregacionService', () => {
  let service: ConsultaagregacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaagregacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
