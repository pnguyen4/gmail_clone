import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';
import { switchMap, mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmailService } from '../../services/email.service';
import { EmailApiAction } from './email.actions';

// The GOAT: https://ngrx.io/guide/effects

@Injectable()
export class EmailEffects {

  constructor(private actions$: Actions,
              private store: Store,
              private emailService: EmailService) {}

  loadEmails$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Load Emails'),
    mergeMap(() =>
      // TODO: fetch all emails and handle filtering & pagination on client side, OR use actual label string
      from(this.emailService.fetchEmailList()).pipe(
        // TODO: rethink server return to actually get to error?
        map((data) => EmailApiAction.loadEmailsSuccess({ emails: data.emails })),
        catchError((error) => of(EmailApiAction.loadEmailsFailure({ error: error.msg })))
      )
    )
  ));

  addEmailLabel$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Add Label'),
    switchMap((action: any) => this.emailService.addLabel(action.id, action.label).pipe())
  ));

  delEmailLabel$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Delete Label'),
    switchMap((action: any) => this.emailService.deleteLabel(action.id, action.label).pipe())
  ));
}
