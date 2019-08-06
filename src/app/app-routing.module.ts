import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PeopleListComponent} from './modules/people/people-list/people-list.component';
import {PeopleCreateComponent} from './modules/people/people-create/people-create.component';
import {PeopleViewComponent} from './modules/people/people-view/people-view.component';


const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'add',
    component: PeopleCreateComponent
  },
  {
    path: 'add/:id',
    component: PeopleCreateComponent
  },
  {
    path: 'detail/:id',
    component: PeopleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
