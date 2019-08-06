import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeopleListComponent} from './people/people-list/people-list.component';


const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
