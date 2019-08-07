import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PeopleCreateComponent} from './people-create.component';
import {
  MatButtonModule,
  MatFormFieldModule, MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {PeopleService} from '../../../services/people-service/people.service';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';

describe('PeopleCreateComponent', () => {
  let component: PeopleCreateComponent;
  let fixture: ComponentFixture<PeopleCreateComponent>;
  let service: PeopleService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCreateComponent],
      imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule,
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [ PeopleService, FormBuilder]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    service = TestBed.get(PeopleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should start creating a new person', () => {

    spyOn(component, 'isEdit').and.callFake(() => undefined);

    component.prepareForm();
    fixture.detectChanges();

    expect(component.peopleForm.value.name).toBeNull();
    expect(component.peopleForm.value.age).toBeNull();
    expect(component.peopleForm.value.cpf).toBeNull();

  });
  it('should start editing a person', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11};

    spyOn(component, 'isEdit').and.callFake(() => mockData.id);
    spyOn(service, 'findById').and.returnValue(of(mockData));

    component.prepareForm();

    expect(component.peopleForm.value.name).toEqual(mockData.name);
    expect(component.peopleForm.value.age).toEqual(mockData.age);
    expect(component.peopleForm.value.cpf).toEqual(mockData.cpf);
    expect(component.id).toEqual(mockData.id);
    expect(component.isLoading).toBe(false);
    expect(component.hasError).toBe(false);
  });
  it('should start editing a person and get a error', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11};
    const errorMessage = 'Error';

    spyOn(component, 'isEdit').and.callFake(() => mockData.id);
    spyOn(service, 'findById').and.returnValue(throwError(errorMessage));

    component.prepareForm();
    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
    expect(component.hasError).toBe(true);
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should save a new person with success', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', age: 11, id: ''};
    spyOn(component, 'isEdit').and.returnValue(undefined);
    spyOn(service, 'add').and.returnValue(of({...mockData, id: '1'}));
    spyOn(router, 'navigate');

    component.prepareForm();

    component.peopleForm.setValue(mockData);

    component.onSubmit();

    fixture.detectChanges();

    expect(component.hasError).toBe(false);
    expect(service.add).toHaveBeenCalledWith(mockData);
    expect(router.navigate).toHaveBeenCalledWith(['detail', '1']);
    expect(component.isLoading).toEqual(false);

  });

  it('should save a new person with error', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', age: 11, id: ''};
    const errorMock = 'Error';
    spyOn(component, 'isEdit').and.returnValue(undefined);
    spyOn(service, 'add').and.returnValue(throwError(errorMock));

    component.prepareForm();

    component.peopleForm.setValue(mockData);

    component.onSubmit();

    fixture.detectChanges();

    expect(service.add).toHaveBeenCalledWith(mockData);
    expect(component.hasError).toBe(true);
    expect(component.errorMessage).toEqual(errorMock);
    expect(component.isLoading).toEqual(false);
  });


  it('should update a existing person with success', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', age: 11, id: '1'};
    const mockDataEdited = {name: 'Antonio Silva2', cpf: '000.000.000-01', age: 12, id: '1'};
    const mockDataCalled = {name: 'Antonio Silva2', cpf: '000.000.000-01', age: 12};
    spyOn(component, 'isEdit').and.returnValue('1');
    spyOn(service, 'update').and.returnValue(of(mockDataEdited));
    spyOn(service, 'findById').and.returnValue(of(mockData));
    spyOn(router, 'navigate');

    component.prepareForm();

    component.peopleForm.setValue(mockDataEdited);

    component.onSubmit();

    fixture.detectChanges();

    expect(service.findById).toHaveBeenCalledWith('1');
    expect(service.update).toHaveBeenCalledWith('1', mockDataCalled );
    expect(component.isLoading).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['detail', '1']);

  });

  it('should update a existing person with error', () => {

    const mockData = {name: 'Antonio Silva', cpf: '000.000.000-00', age: 11, id: '1'};
    const mockDataEdited = {name: 'Antonio Silva2', cpf: '000.000.000-01', age: 12, id: '1'};
    const mockDataCalled = {name: 'Antonio Silva2', cpf: '000.000.000-01', age: 12};
    const errorMock = 'Error';

    spyOn(component, 'isEdit').and.returnValue('1');
    spyOn(service, 'findById').and.returnValue(of(mockData));
    spyOn(service, 'update').and.returnValue(throwError(errorMock));
    spyOn(router, 'navigate');

    component.prepareForm();
    component.peopleForm.setValue(mockDataEdited);
    component.onSubmit();

    fixture.detectChanges();

    expect(service.findById).toHaveBeenCalledWith('1');
    expect(service.update).toHaveBeenCalledWith('1', mockDataCalled );
    expect(component.isLoading).toEqual(false);
    expect(component.hasError).toBe(true);
    expect(component.errorMessage).toEqual(errorMock);

  });



});
