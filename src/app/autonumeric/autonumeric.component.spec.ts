/**
 * @author Abdelghani AINOUSS
 * abdelghani@ainouss.fr
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutonumericComponent } from './autonumeric.component';

describe('AutonumericComponent', () => {
  let component: AutonumericComponent;
  let fixture: ComponentFixture<AutonumericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutonumericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
