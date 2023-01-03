import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { EmailAction } from '../../store/email/email.actions';
import { LabelAction } from '../../store/label/label.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup = this.fb.group({
    // TODO, add phone option? Also update Mongo schema to reflect this.
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  submit(): void {
    //console.log(this.signinForm.getRawValue());
    if (!this.signinForm.valid) {
      alert('Form Invalid'); // TODO: make more like gmail
      return;
    }

    this.auth.signin(this.signinForm.getRawValue()).subscribe(data => {
      if (data?.status == "success") {
        this.auth.saveToken(data.token, JSON.stringify(data.user));
        this.store.dispatch(LabelAction.loadLabels());
        this.store.dispatch(EmailAction.loadEmails());
        this.router.navigate(['mail']);
      } else {
        alert(data.msg);
      }
    });
  }

}
