import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { EmailAction } from '../../store/email/email.actions';
import { selectEmailById } from '../../store/email/email.selectors';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  protected id: string = '';
  email$ = this.store.select(selectEmailById({id: this.id}));

  constructor(private store: Store,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? 'error';
      this.store.dispatch(EmailAction.setCurrentEmail({id: this.id}))
    });
  }
}
