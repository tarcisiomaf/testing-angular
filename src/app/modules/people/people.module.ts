import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule} from '@angular/material';


import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleCreateComponent } from './people-create/people-create.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PeopleListComponent, PeopleCreateComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule
  ],
  entryComponents: [
  ]
})
export class PeopleModule { }
