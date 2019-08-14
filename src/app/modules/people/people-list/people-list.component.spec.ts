import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { of, throwError } from 'rxjs'; // Add import
import { PeopleListComponent } from './people-list.component';
import {MatTableModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {PeopleService} from '../../../services/people-service/people.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Person} from '../../../models/Person';



describe('PeopleListComponent', () => {

  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let service: PeopleService;

  // Config imports and providers
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleListComponent],
      imports: [ MatTableModule, MatButtonModule, MatProgressSpinnerModule, HttpClientTestingModule, RouterTestingModule],
      providers: [PeopleService]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PeopleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be loading', () => {

    component.isLoading = true;

    // Fazendo a verificação pelo elemento renderizado
    const loading = fixture.nativeElement.querySelector('#loading-div');
    const table = fixture.nativeElement.querySelector('#table-div');
    const empty = fixture.nativeElement.querySelector('#empty-list-div');

    expect(component.isLoading).toBe(true);
    expect(loading).not.toBeNull();
    expect(table).toBeNull();
    expect(empty).toBeNull();

  });

  it('should render `list is empty`', () => {

    spyOn(service, 'find').and.returnValue(of([]));

    component.getPeople();

    // Executa a mudança de estado
    fixture.detectChanges();

    // Pega os componentes renderizados
    const loading = fixture.nativeElement.querySelector('#loading-div');
    const table = fixture.nativeElement.querySelector('#table-div');
    const empty = fixture.nativeElement.querySelector('#empty-list-div');

    // Verifica se a renderização ocorreu corretamente
    expect(loading).toBeNull();
    expect(table).not.toBeNull();
    expect(empty).not.toBeNull();
  });

  it('should render people table', () => {
    const mockData: Person[] = [{name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11},
      {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42},
      {name: 'Mônica Freitas', cpf: '000.000.000-02', id: '3',  age: 23}];

    // mock of service
    spyOn(service, 'find').and.returnValue(of(mockData));

    // this method use the service find method inside
    component.getPeople();

    fixture.detectChanges();

    expect(component.errorMessage).toBe(undefined);
    expect(component.isError).toBe(false);
    expect(component.isLoading).toBe(false);
    expect(component.people).toEqual(mockData);

  });

  it('should be a unexpected error', () => {
    const errorMessage = 'Error Message Mock';
    // service returning a non expected error;
    spyOn(service, 'find').and.returnValue(throwError(errorMessage));

    component.getPeople();

    fixture.detectChanges();

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.isError).toBe(true);
    expect(component.isLoading).toBe(false);
    expect(component.people).toEqual([]);

  });

});
