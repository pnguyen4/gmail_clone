import { createReducer, on } from '@ngrx/store';
import { EmailAction, EmailApiAction } from './email.actions';

export interface EmailState {
  emails: any[]; // TODO: use email interface
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: EmailState = {
  emails: [],
  error: null,
  status: 'pending'
}

export const emailReducer = createReducer(
  initialState,
  on(EmailAction.loadEmails, (state) => ({...state, status: 'loading'})),
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
