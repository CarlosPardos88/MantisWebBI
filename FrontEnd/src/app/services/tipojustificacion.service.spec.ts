import { TestBed } from '@angular/core/testing';

import { TipojustificacionService } from './tipojustificacion.service';

describe('TipojustificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipojustificacionService = TestBed.get(TipojustificacionService);
    expect(service).toBeTruthy();
  });
});
