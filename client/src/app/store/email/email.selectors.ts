import { createSelector } from '@ngrx/store';
import { EmailState } from './email.reducers';
import { LabelState } from '../label/label.reducers';
import { AppState } from '../app.state';

const selectEmailState = (state: AppState) => state.emails;
const selectLabelState = (state: AppState) => state.labels;

// TODO: properly type this, for now it silences warning in email-list.component.ts
export const selectEmails = createSelector<any, any, any>(
  selectEmailState,
  selectLabelState,
  // maybe provide some condition to get certain # of emails and /w specific label?
  // TODO: use label state's current_label to filter emails
  (state: EmailState) => state.emails
);
