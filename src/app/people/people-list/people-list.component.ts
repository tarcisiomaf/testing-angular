import { Component, OnInit } from '@angular/core';
import {Person} from '../model/Person';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'cpf','age'];

  people: Person [] = [
    {name: 'Antonio Silva', cpf: '000.000.000-00', id: '1', age: 11},
    {name: 'Eduardo Araujo', cpf: '000.000.000-01', id: '2', age: 42},
    {name: 'Mônica Freitas', cpf: '000.000.000-02', id: '3', age: 23},
    {name: 'Otavio Augusto', cpf: '000.000.000-03', id: '4', age: 51},
    {name: 'Andre Santos', cpf: '000.000.000-04', id: '5', age: 17},
    {name: 'Felipe Otavio', cpf: '000.000.000-05', id: '6', age: 28}
  ];


  constructor() { }

  ngOnInit() {
  }

}
