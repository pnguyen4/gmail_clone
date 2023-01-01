import { createReducer, on } from '@ngrx/store';
import { EmailAction, EmailApiAction } from './email.actions';

export interface EmailState {
  current_email: string;
  emails: any[]; // TODO: use email interface
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: EmailState = {
  current_email: "",
  emails: [],
  error: null,
  status: 'pending'
}

export const emailReducer = createReducer(
  initialState,

  on(EmailAction.loadEmails, (state) => ({...state, status: 'loading'})),

  on(EmailAction.setCurrentEmail, (state, { id }) => ({
    ...state,
    current_email: id
  })),

  on(EmailApiAction.loadEmailsSuccess, (state, { emails }) => ({
    ...state,
    emails: emails,
    error: null,
    status: 'success'
  })),

  on(EmailApiAction.loadEmailsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
