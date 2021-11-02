import { TestBed } from '@angular/core/testing';

import { EjecucionesService } from './ejecuciones.service';

describe('EjecucionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjecucionesService = TestBed.get(EjecucionesService);
    expect(service).toBeTruthy();
  });
});
