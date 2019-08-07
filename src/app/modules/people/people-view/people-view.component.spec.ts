import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleViewComponent } from './people-view.component';
import {MatButtonModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PeopleService} from '../../../services/people-service/people.service';

describe('PeopleViewComponent', () => {
  let component: PeopleViewComponent;
  let fixture: ComponentFixture<PeopleViewComponent>;
  let service: PeopleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule, MatButtonModule, MatProgressSpinnerModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ PeopleViewComponent ],
      providers: [PeopleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleViewComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PeopleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading', ( ) => {
    component.isLoading = true;
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector('#loading-div');
    const details = fixture.nativeElement.querySelector('#details-div');
    expect(loading).not.toBeNull();
    expect(details).toBeNull();

  });

  it('should render detail', () => {
    component.isLoading = false;

    spyOn(component, 'getPerson').and.callFake(() => {
      component.person = {
        name: 'Antonio Silva',
        cpf: '000.000.000-00',
        id: '1', age: 11};
    });

    component.getPerson();
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('#loading-div');
    const details = fixture.nativeElement.querySelector('#details-div');
    const detailsTitle = fixture.nativeElement.querySelector('#title-div');

    expect(loading).toBeNull();
    expect(details).not.toBeNull();
    expect(detailsTitle.innerText).toEqual(component.person.name);
  });

  it('should return for list page', () => {
    component.isLoading = false;

    spyOn(component, 'getPerson').and.callFake(() => {
      component.person = undefined;
      component.toList();
    });
    component.getPerson();
    fixture.detectChanges();

  });
});
