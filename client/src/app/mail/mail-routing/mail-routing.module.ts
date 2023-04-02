import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EmailListComponent } from 'src/app/components/email-list/email-list.component';
import { EmailViewComponent } from 'src/app/components/email-view/email-view.component';
import { HomeComponent } from 'src/app/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  { path: ':label', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: '', component: EmailListComponent },
    { path: ':id', component: EmailViewComponent }
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class MailRoutingModule { }
