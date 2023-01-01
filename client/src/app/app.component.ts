import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { EmailAction } from './store/email/email.actions';
import { LabelAction } from './store/label/label.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private store: Store,
              private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      // do this here instead of home component to prevent unnecessary repeated fetches
      this.store.dispatch(LabelAction.loadLabels());
      this.store.dispatch(EmailAction.loadEmails());
    }
  }
}
