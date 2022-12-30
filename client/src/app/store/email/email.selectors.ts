import { createSelector } from '@ngrx/store';
import { EmailState } from './email.reducers';
import { AppState } from '../app.state';

const selectEmailState = (state: AppState) => state.emails;

// TODO: properly type this, silences warning in email-list.component.ts
export const selectEmails = createSelector<any, any, any>(
  selectEmailState,
  // maybe provide some condition to get certain # of emails and /w specific label?
  (state: EmailState) => state.emails
);
