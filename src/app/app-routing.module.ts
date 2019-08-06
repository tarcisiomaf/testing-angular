import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeopleListComponent} from './modules/people/people-list/people-list.component';
import {PeopleCreateComponent} from './modules/people/people-create/people-create.component';


const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'add',
    component: PeopleCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
