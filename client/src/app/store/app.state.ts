import { EmailState } from './email/email.reducers';
import { LabelState } from './label/label.reducers';

export interface AppState {
  emails: EmailState;
  labels: LabelState;
}
