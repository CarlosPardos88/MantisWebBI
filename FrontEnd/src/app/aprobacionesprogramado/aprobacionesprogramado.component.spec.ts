import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesprogramadoComponent } from './aprobacionesprogramado.component';

describe('AprobacionesprogramadoComponent', () => {
  let component: AprobacionesprogramadoComponent;
  let fixture: ComponentFixture<AprobacionesprogramadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionesprogramadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesprogramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
