import { TestBed } from '@angular/core/testing';

import { FuentesService } from './fuentes.service';

describe('FuentesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuentesService = TestBed.get(FuentesService);
    expect(service).toBeTruthy();
  });
});
