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


});
