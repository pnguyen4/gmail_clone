import { createActionGroup, emptyProps, props } from '@ngrx/store';
// TODO create interface for emails

// Note: type of each action created is: "[source] event_name"

export const EmailAction = createActionGroup({
  source: 'Home Page',
  events: {
    'Load Emails': emptyProps(),
  }
});

export const EmailApiAction = createActionGroup({
  source: 'Email API',
  events: {
    'Load Emails Success': props<{ emails: any[] }>(),
    'Load Emails Failure': props<{ error: string }>()
  }
});