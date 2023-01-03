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

function addhelper(emails: any[], id: string, label: string) {
  let idx = emails.findIndex(email => email._id == id);
  let newlabels = [...emails[idx].labels, label];
  let newemail = {...emails[idx], labels: newlabels };
  return [...emails.slice(0, idx), newemail, ...emails.slice(idx + 1)];
}

function delhelper(emails: any[], id: string, label: string) {
  let idx = emails.findIndex(email => email._id == id);
  let idxlabel = emails[idx].labels.findIndex((lbl:string) => lbl == label);

  let newlabels = [...emails[idx].labels.slice(0, idxlabel),
                   ...emails[idx].labels.slice(idxlabel + 1)];
  let newemail = {...emails[idx], labels: newlabels };

  return [...emails.slice(0, idx), newemail, ...emails.slice(idx + 1)];
}

function modifyhelper(emails: any[], id: string, labels: string[]) {
  let idx = emails.findIndex(email => email._id == id);
  let newemail = {...emails[idx], labels: labels};
  return [...emails.slice(0, idx), newemail, ...emails.slice(idx + 1)];
}

export const emailReducer = createReducer(
  initialState,

  on(EmailAction.loadEmails, (state) => ({...state, status: 'loading'})),

  on(EmailAction.setCurrentEmail, (state, { id }) => ({
    ...state,
    current_email: id
  })),

  on(EmailAction.addLabel, (state, { id, label }) => ({
    ...state,
    emails: addhelper(state.emails, id, label)
  })),

  on(EmailAction.deleteLabel, (state, { id, label }) => ({
    ...state,
    emails: delhelper(state.emails, id, label)
  })),

  on(EmailAction.modifyLabels, (state, { id, labels }) => ({
    ...state,
    emails: modifyhelper(state.emails, id, labels)
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
