import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionesdemandaComponent } from './aprobacionesdemanda.component';

describe('AprobacionesdemandaComponent', () => {
  let component: AprobacionesdemandaComponent;
  let fixture: ComponentFixture<AprobacionesdemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionesdemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionesdemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
