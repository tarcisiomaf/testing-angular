import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponent } from './people-list.component';
import {MatTableModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {PeopleService} from '../../../services/people-service/people.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleListComponent],
      imports: [ MatTableModule, MatButtonModule, MatProgressSpinnerModule, HttpClientTestingModule ],
      providers: [PeopleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading spinner', () => {

    component.isLoading = true;
    component.people = [];

    const loading = fixture.nativeElement.querySelector('#loading-div');
    const table = fixture.nativeElement.querySelector('#table-div');
    const empty = fixture.nativeElement.querySelector('#empty-list-div');

    expect(loading).not.toBeNull();
    expect(table).toBeNull();
    expect(empty).toBeNull();
  });

  it('should render `list is empty`', () => {

    // Se não estiver mais carregando e a lista de pessoas estiver vazia
    component.isLoading = false;
    component.people = [];
    // Executa a mudança de estado
    fixture.detectChanges();

    // Pega os componentes renderizados
    const loading = fixture.nativeElement.querySelector('#loading-div');
    const table = fixture.nativeElement.querySelector('#table-div');
    const empty = fixture.nativeElement.querySelector('#empty-list-div');

    // Verifica se a renderização ocorreu corretamente
    expect(loading).toBeNull();
    expect(table).toBeNull();
    expect(empty).not.toBeNull();
  });

  it('should render people table', () => {

    spyOn(component, 'getPeople').and.callFake(() => {
      component.people = [
        {name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11},
        {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42},
        {name: 'Mônica Freitas', cpf: '000.000.000-02', id: '3',  age: 23},
      ];
      component.isLoading = false;
    });

    component.getPeople();

    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('#loading-div');
    const table = fixture.nativeElement.querySelector('#table-div');
    const empty = fixture.nativeElement.querySelector('#empty-list-div');

    expect(loading).toBeNull();
    expect(table).not.toBeNull();
    expect(empty).toBeNull();
  });

});
