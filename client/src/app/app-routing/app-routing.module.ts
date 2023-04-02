import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../guards/login.guard';
import { SigninComponent } from  '../components/signin/signin.component';
import { SignupComponent } from  '../components/signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'mail', loadChildren: () => import('../mail/mail.module').then(m => m.MailModule)},
  // TODO: maybe make a 404 page?
  { path: '**', redirectTo:'signin', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
