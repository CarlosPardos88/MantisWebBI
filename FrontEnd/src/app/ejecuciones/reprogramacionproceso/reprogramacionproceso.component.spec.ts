import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramacionprocesoComponent } from './reprogramacionproceso.component';

describe('ReprogramacionprocesoComponent', () => {
  let component: ReprogramacionprocesoComponent;
  let fixture: ComponentFixture<ReprogramacionprocesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramacionprocesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramacionprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
