import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailRoutingModule } from './mail-routing/mail-routing.module';
import { EmailListComponent } from 'src/app/components/email-list/email-list.component';
import { EmailViewComponent } from 'src/app/components/email-view/email-view.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComposerComponent } from '../components/composer/composer.component';

@NgModule({
  declarations: [
    EmailListComponent,
    EmailViewComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ComposerComponent,
    HomeComponent
  ],
  imports: [
    MailRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    EmailListComponent,
    EmailViewComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent
  ]
})
export class MailModule { }
