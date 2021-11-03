import { TestBed } from '@angular/core/testing';

import { NumeralcambiarioService } from './numeralcambiario.service';

describe('NumeralcambiarioService', () => {
  let service: NumeralcambiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeralcambiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
