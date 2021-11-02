import { TestBed } from '@angular/core/testing';

import { SolicitudesdemandaService } from './solicitudesdemanda.service';

describe('SolicitudesdemandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudesdemandaService = TestBed.get(SolicitudesdemandaService);
    expect(service).toBeTruthy();
  });
});
