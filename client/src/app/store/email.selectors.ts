import { createSelector } from '@ngrx/store';
import { EmailState } from './email.reducers';

export interface AppState {
  // we might want to store a lot of things in our store
  emails: EmailState
}

const selectEmailState = (state: AppState) => state.emails;

// TODO: properly type this, silences warning in email-list.component.ts
export const selectEmails = createSelector<any, any, any>(
  selectEmailState,
  // maybe provide some condition to get certain # of emails and /w specific label?
  (state: EmailState) => state.emails
);
