import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';

import { EmailAction } from '../../store/email/email.actions';
import { selectEmailById } from '../../store/email/email.selectors';
import { selectAllLabels } from '../../store/label/label.selectors';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  protected id: string = '';
  email$ = this.store.select(selectEmailById({id: this.id}));
  labels$ = this.store.select(selectAllLabels);
  checkboxvals: string[] = [];
  labelprompt: boolean = false;

  constructor(private store: Store,
              private fb: FormBuilder,
              private router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? 'error';
      this.store.dispatch(EmailAction.setCurrentEmail({id: this.id}))
    });
  }

  togglelabelprompt(): void {
    this.labelprompt = !this.labelprompt;
  }

  togglecheckbox(e: any): void {
    if (e.target.checked) {
      this.checkboxvals.push(e.target.value);
    } else {
      const idx = this.checkboxvals.findIndex(labels => labels == e.target.value);
      this.checkboxvals.splice(idx, 1);
    }
  }

  submit(): void {
    if (this.checkboxvals.length > 0) {
      this.store.dispatch(EmailAction.modifyEmailLabels({id: this.id, labels: this.checkboxvals}));
      this.labelprompt = false;
    }
  }

  trash(): void {
    this.store.dispatch(EmailAction.modifyEmailLabels({id: this.id, labels: ['trash']}));
    this.router.navigate(['..']);
  }
}
