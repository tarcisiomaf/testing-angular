import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { PeopleViewComponent } from './people-view.component';
import {MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {PeopleService} from '../../../services/people-service/people.service';
import {of, throwError} from 'rxjs';
import {Person} from '../../../models/Person';
import {Router} from '@angular/router';

describe('PeopleViewComponent', () => {

  let component: PeopleViewComponent;
  let fixture: ComponentFixture<PeopleViewComponent>;
  let service: PeopleService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule, MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule,
        HttpClientTestingModule, RouterTestingModule],
      declarations: [ PeopleViewComponent],
      providers: [PeopleService]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleViewComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PeopleService);
    router = TestBed.get(Router);
    // router.getCurrentNavigation();
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
    expect(component.isLoading).toBe(true);

  });

  it('should be a unexpected error in find person', () => {
    const mockError = 'Error';

    spyOn(service, 'findById').and.returnValue( throwError( mockError ) );

    component.getPerson();

    fixture.detectChanges();

    expect(component.isError).toBe(true);
    expect(component.errorMessage).toEqual(mockError);
    expect(component.isLoading).toBe(false);

  });

  it('should not find person', () => {
    const mockData: Person =  undefined;

    spyOn(service, 'findById').and.returnValue( of( mockData ) );
    spyOn(router, 'navigate');

    component.getPerson();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading).toBe(false);
    expect(component.person).toBe(mockData);
  });

  it('should find person', () => {
    const mockData: Person =  {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42};

    spyOn(service, 'findById')
      .and
      .returnValue( of( mockData ) );

    component.getPerson();

    fixture.detectChanges();


    expect(component.isLoading).toBe(false);
    expect(component.person).toBe(mockData);
    expect(component.errorMessage).toBeUndefined();
    expect(component.isError).toBe(false);
  });

  it('should delete success person', () => {
    const mockData: Person =  {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42};
    component.person = mockData;

    spyOn(service, 'remove').and.returnValue(of(mockData));
    spyOn(router, 'navigate');
    component.deletePerson();

    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.errorMessage).toBeUndefined();
    expect(component.isError).toBe(false);



  });

  it('should delete error person',  () => {
    component.person =  {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42};
    const errorMessage = 'Something wrong';

    spyOn(service, 'remove').and.returnValue(throwError(errorMessage));
    component.deletePerson();

    fixture.detectChanges();

    expect(component.isError).toBe(true);
    expect(component.errorMessage).toEqual(errorMessage);

  });

  it('should edit person', () => {
    component.person =  {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42};

    spyOn(router, 'navigate');

    component.editPerson();

    expect(router.navigate).toHaveBeenCalledWith(['edit', '2']);

  });

});
