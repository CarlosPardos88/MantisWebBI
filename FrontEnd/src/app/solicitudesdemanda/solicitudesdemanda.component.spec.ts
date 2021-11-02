import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesdemandaComponent } from './solicitudesdemanda.component';

describe('SolicitudesdemandaComponent', () => {
  let component: SolicitudesdemandaComponent;
  let fixture: ComponentFixture<SolicitudesdemandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesdemandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesdemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
