import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraFormComponent } from './form.component';

describe('EstructuraFormComponent', () => {
  let component: EstructuraFormComponent;
  let fixture: ComponentFixture<EstructuraFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
