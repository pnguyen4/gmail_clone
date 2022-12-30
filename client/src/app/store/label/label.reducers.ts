import { createReducer, on } from '@ngrx/store';
import { LabelAction, LabelApiAction } from './label.actions';

export interface LabelState {
  current_label: string,
  labels: string[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: LabelState = {
  current_label: 'inbox',
  labels: [],
  error: null,
  status: 'pending'
}

export const labelReducer = createReducer(
  initialState,

  on(LabelAction.loadLabels, (state) => ({...state, status: 'loading'})),

  on(LabelAction.setCurrentLabel, (state, { label }) => ({
    ...state,
    current_label: label
  })),

  on(LabelApiAction.loadLabelsSuccess, (state, { labels }) => ({
    ...state,
    labels: labels,
    error: null,
    status: 'success'
  })),

  on(LabelApiAction.loadLabelsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
