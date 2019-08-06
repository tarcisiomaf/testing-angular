import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../../services/people-service/people.service';
import {Person} from '../../../models/Person';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-people-view',
  templateUrl: './people-view.component.html',
  styleUrls: ['./people-view.component.scss']
})
export class PeopleViewComponent implements OnInit {

  person: Person = undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute, private api: PeopleService, private router: Router) { }

  toList() {
    this.router.navigate(['/']);
  }
  getPerson() {
    const id = this.route.snapshot.params.id;
    this.api.findById(id).subscribe(
      s => {
        if (!s) {
          this.toList();
        }
        this.person = s;
      },
      e => {
        console.log(e);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  deletePerson() {
    this.isLoading = true;
    this.api.remove(this.person.id)
      .subscribe(
        s => {
          this.router.navigate(['/']);
        },
        e => {
          console.log('Algo inesperado aconteceu');
        },
        () => {
          this.isLoading = false;
        });
  }
  ngOnInit() {
    this.getPerson();
  }

}
