import { Component, OnInit } from '@angular/core';
import {Person} from '../../../models/Person';
import {PeopleService} from '../../../services/people-service/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {

  isLoading = true;
  displayedColumns: string[] = ['id', 'name', 'cpf', 'age'];
  people: Person [] = [];


  constructor(private api: PeopleService) {}

  getPeople() {
    this.api.find().subscribe(
      s => {
        this.people = s;
        },
      e => {
        console.log(e);
        },
      ( ) => {
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getPeople();
  }

}
