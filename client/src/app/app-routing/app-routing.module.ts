import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { SigninComponent } from  '../components/signin/signin.component';
import { SignupComponent } from  '../components/signup/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { EmailListComponent } from '../components/email-list/email-list.component';
import { EmailViewComponent } from '../components/email-view/email-view.component'

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'mail', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', component: EmailListComponent },
    { path: ':id', component: EmailViewComponent }
  ]}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
