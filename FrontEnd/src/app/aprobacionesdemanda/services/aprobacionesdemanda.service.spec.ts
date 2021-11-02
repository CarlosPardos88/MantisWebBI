import { TestBed } from '@angular/core/testing';

import { AprobacionesdemandaService } from './aprobacionesdemanda.service';

describe('AprobacionesdemandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprobacionesdemandaService = TestBed.get(AprobacionesdemandaService);
    expect(service).toBeTruthy();
  });
});
