import { TestBed } from '@angular/core/testing';

import { EstructuraService } from './estructura.service';

describe('EstructuraService', () => {
  let service: EstructuraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstructuraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
