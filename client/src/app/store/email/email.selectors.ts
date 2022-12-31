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
  (emailState: EmailState, labelState: LabelState) =>
    emailState.emails.filter((email) =>
      email.labels.includes(labelState.current_label))
);
