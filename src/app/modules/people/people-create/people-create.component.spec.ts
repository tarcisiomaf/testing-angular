import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCreateComponent } from './people-create.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PeopleCreateComponent', () => {
  let component: PeopleCreateComponent;
  let fixture: ComponentFixture<PeopleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCreateComponent ],
      imports: [MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
