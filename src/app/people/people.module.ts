import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatTableModule, MatButtonModule} from '@angular/material';


import { PeopleListComponent } from './people-list/people-list.component';



@NgModule({
  declarations: [PeopleListComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule
  ],
  entryComponents: [
  ]
})
export class PeopleModule { }
