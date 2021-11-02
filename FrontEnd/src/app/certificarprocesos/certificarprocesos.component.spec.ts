import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificarprocesosComponent } from './certificarprocesos.component';

describe('CertificarprocesosComponent', () => {
  let component: CertificarprocesosComponent;
  let fixture: ComponentFixture<CertificarprocesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificarprocesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificarprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
