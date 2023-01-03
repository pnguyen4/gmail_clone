import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailViewComponent } from './components/email-view/email-view.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { httpInterceptorProviders } from './http-interceptors';

import { emailReducer } from './store/email/email.reducers';
import { EmailEffects } from './store/email/email.effects';
import { labelReducer } from './store/label/label.reducers';
import { LabelEffects } from './store/label/label.effects';
import { ComposerComponent } from './components/composer/composer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmailListComponent,
    EmailViewComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ComposerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ emails: emailReducer, labels: labelReducer }),
    EffectsModule.forRoot([EmailEffects, LabelEffects])
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
