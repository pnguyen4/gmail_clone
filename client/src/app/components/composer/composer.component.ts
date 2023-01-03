import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { EmailAction } from '../../store/email/email.actions';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss']
})
export class ComposerComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<string>();
  form: FormGroup = this.fb.group({
    recipients: ['', Validators.required],
    subject:    [''],
    body:       ['']
  });

  constructor(private fb: FormBuilder,
              private store: Store,
              private emailService: EmailService) { }

  ngOnInit(): void {
  }

  closeComposer(): void {
    this.form.reset();
    this.closeEvent.emit();
  }

  submit(): void {
    if (!this.form.valid) { return alert('at least recipients required'); }
    let recipients = this.form.value.recipients.split(', ');
    for (let recipient of recipients) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(recipient)) {
        return alert(`${recipient} not a valid email`);
      }
    }
    const subject = this.form.value.subject ? this.form.value.subject : 'no subject';
    const body = this.form.value.body ? this.form.value.body : 'no body';

    this.emailService.sendEmail(recipients, subject, body).subscribe(res => {
      if (res.status == "success") {
        this.store.dispatch(EmailAction.loadEmails());
        this.closeComposer();
      } else {
        console.log('could not create email')
      }
    });
  }
}
