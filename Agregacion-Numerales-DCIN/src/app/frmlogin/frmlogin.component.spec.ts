import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmloginComponent } from './frmlogin.component';

describe('FrmloginComponent', () => {
  let component: FrmloginComponent;
  let fixture: ComponentFixture<FrmloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
