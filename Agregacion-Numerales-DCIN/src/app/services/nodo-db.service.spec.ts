import { TestBed } from '@angular/core/testing';

import { NodoDBService } from './nodo-db.service';

describe('NodoDBService', () => {
  let service: NodoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
