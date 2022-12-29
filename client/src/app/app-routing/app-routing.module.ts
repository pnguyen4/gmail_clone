import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailListComponent } from '../email-list/email-list.component';
import { EmailViewComponent } from '../email-view/email-view.component'

const routes: Routes = [
  { path: '', component: EmailListComponent },
  { path: 'mail/:id', component: EmailViewComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
