import { createActionGroup, emptyProps, props } from '@ngrx/store';
// TODO create interface for emails

// Note: type of each action created is: "[source] event_name"

export const EmailAction = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Emails': emptyProps(),
    'Set Current Email': props<{ id: string }>(),
    'Delete Label': props<{ id: string, label: string }>(),
    'Add Label': props<{ id: string, label: string }>(),
    'Modify Labels': props<{ id: string, labels: string[] }>()
  }
});

export const EmailApiAction = createActionGroup({
  source: 'Email API',
  events: {
    'Load Emails Success': props<{ emails: any[] }>(),
    'Load Emails Failure': props<{ error: string }>()
  }
});
