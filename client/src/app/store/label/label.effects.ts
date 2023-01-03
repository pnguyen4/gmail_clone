import { Injectable } from '@angular/core';
import { of, from, EMPTY } from 'rxjs';
import { switchMap, mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LabelService } from '../../services/label.service';
import { LabelApiAction } from './label.actions';

// The GOAT: https://ngrx.io/guide/effects

@Injectable()
export class LabelEffects {

  constructor(private actions$: Actions,
              private store: Store,
              private labelService: LabelService) {}

  loadLabels$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Load Labels'),
    mergeMap(() =>
      from(this.labelService.fetchLabelList()).pipe(
        // TODO: rethink server return to actually get to error?
        map((data) => LabelApiAction.loadLabelsSuccess({ labels : data.labels })),
        catchError((error) => of(LabelApiAction.loadLabelsFailure({ error: error.msg })))
      )
    )
  ));

  newLabel$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Create New Label'),
    switchMap((action: any) => this.labelService.newLabel(action.label))
  ));

  delLabel$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Delete Label'),
    switchMap((action: any) => this.labelService.deleteLabel(action.label))
  ));

}
