import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LabelAction = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Labels': emptyProps(),
    'Set Current Label': props<{ label: string }>(),
    'Create New Label': props<{ label: string }>(),
    'Delete Label': props<{ label: string}>()
  }
});

export const LabelApiAction = createActionGroup({
  source: 'Label API',
  events: {
    'Load Labels Success': props<{ labels: string[] }>(),
    'Load Labels Failure': props<{ error: string }>()
  }
});
