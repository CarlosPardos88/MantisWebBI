import { TestBed } from '@angular/core/testing';

import { AgregacionService } from './agregacion.service';

describe('AgregacionService', () => {
  let service: AgregacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
