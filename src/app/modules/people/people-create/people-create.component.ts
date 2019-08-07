import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../../services/people-service/people.service';
import {ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-people-create',
  templateUrl: './people-create.component.html',
  styleUrls: ['./people-create.component.scss']
})


export class PeopleCreateComponent implements OnInit {

  matcher = new  MyErrorStateMatcher();
  peopleForm: FormGroup;
  hasError = false;
  errorMessage = undefined;
  isLoading = false;

  id = undefined;
  name =  '';
  age = 20;
  cpf =  '';


  constructor(private api: PeopleService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute ) {}

  onSubmit() {
    const data = this.peopleForm.value;

    if (this.id) {
      this.api.update(this.id, data).subscribe(
        (s) => {
          this.router.navigate(['detail', s.id]);
        },
        e => {
          this.hasError = true;
          this.errorMessage = e;
        }
      );
    } else {
      this.api.add(data).subscribe(
        (s) => {
          this.router.navigate(['detail', s.id]);
        },
        e => {
          this.hasError = true;
          this.errorMessage = e;
        }
      );
    }
  }

  ngOnInit() {
    this.peopleForm = this.formBuilder.group({
      id : [null],
      name : [null, Validators.required],
      age : [null, Validators.required],
      cpf : [null, Validators.required]
    });
    if (this.route.snapshot.params.id) {
      this.isLoading = true;
      this.api.findById(this.route.snapshot.params.id)
        .subscribe(s => {
          this.isLoading = false;

          this.id = s.id;
          this.peopleForm.setValue({
            name: s.name,
            id: s.id,
            cpf: s.cpf,
            age: s.age
        });
          this.peopleForm.controls.id.disable();
        }, e => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = e;
        });
    }

  }

}
