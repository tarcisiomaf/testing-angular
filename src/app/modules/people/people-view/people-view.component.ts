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
  isError = false;
  errorMessage = undefined;

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
        this.isLoading = false;
        this.person = s;
      },
      e => {
        this.errorMessage = e;
        this.isError = true;
        this.isLoading = false;
      });
  }
  deletePerson() {
    this.isLoading = true;
    this.api.remove(this.person.id)
      .subscribe(
        s => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        e => {
          this.isLoading = false;
          this.errorMessage = e;
          this.isError = true;
        });
  }
  editPerson() {
    this.router.navigate(['edit', this.person.id]);
  }
  ngOnInit() {
    this.getPerson();
  }

}
