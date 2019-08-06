import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Add import
import { PeopleService } from './people.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Person} from '../../models/Person';

describe('PeopleService', () => {

  let peopleService: PeopleService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));
  beforeEach(() => {
    peopleService  = TestBed.get(PeopleService);

  });

  it('should be created', () => {
    expect(peopleService).toBeTruthy();
  });


  describe('method get', () => {

    it('execution with success of get method', () => {

      const people: Person[] = [
        {name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11},
        {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2',  age: 42},
        {name: 'Mônica Freitas', cpf: '000.000.000-02', id: '3',  age: 23}
      ];

      // tslint:disable-next-line:one-variable-per-declaration
      let response, error, final;

      spyOn(peopleService, 'find').and.returnValue(of(people));

      peopleService.find().subscribe(
        (s) => {
          response = s;
        },
        e => {
          error = e;
        },
        () => {
          final = true;
        });

      expect(response).toEqual(people);
      expect(error).toBeUndefined();
      expect(final).toBe(true);

    });
  });
});
