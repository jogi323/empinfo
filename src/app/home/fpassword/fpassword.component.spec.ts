import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpasswordComponent } from './fpassword.component';

describe('FpasswordComponent', () => {
  let component: FpasswordComponent;
  let fixture: ComponentFixture<FpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
