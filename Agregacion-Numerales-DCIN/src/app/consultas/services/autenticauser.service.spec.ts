import { TestBed } from '@angular/core/testing';

import { AutenticauserService } from './autenticauser.service';

describe('AutenticauserService', () => {
  let service: AutenticauserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticauserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
