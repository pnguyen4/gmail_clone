import { createSelector } from '@ngrx/store';
import { LabelState } from './label.reducers';
import { AppState } from '../app.state';

const selectLabelState = (state: AppState) => state.labels;

export const selectAllLabels = createSelector<any, any, any>(
  selectLabelState,
  (state: LabelState) => state.labels
);

export const selectCurrentLabel = createSelector<any, any, any>(
  selectLabelState,
  (state: LabelState) => state.current_label
);
