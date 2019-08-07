import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule} from '@angular/material';


import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleCreateComponent } from './people-create/people-create.component';
import {RouterModule} from '@angular/router';
import { PeopleViewComponent } from './people-view/people-view.component';


@NgModule({
  declarations: [PeopleListComponent, PeopleCreateComponent, PeopleViewComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
  ]
})
export class PeopleModule { }
