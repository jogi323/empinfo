import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetdataComponent } from './timesheetdata.component';

describe('TimesheetdataComponent', () => {
  let component: TimesheetdataComponent;
  let fixture: ComponentFixture<TimesheetdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
