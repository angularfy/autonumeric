/**
 * @author Abdelghani AINOUSS
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAutonumericComponent } from './autonumeric.component';

describe('NgAutonumericComponent', () => {
  let component: NgAutonumericComponent;
  let fixture: ComponentFixture<NgAutonumericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAutonumericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAutonumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
