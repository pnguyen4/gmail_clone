import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from "@angular/router"

import { FooterComponent } from '../footer/footer.component';
import { selectEmails } from '../../store/email/email.selectors';
import { EmailAction } from '../../store/email/email.actions';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  emails$ = this.store.select(selectEmails);

  constructor(private store: Store,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  dateFormat(mydate: string): string {
    let date = new Date(mydate);
    return date.toLocaleString('en-US', {month: 'short', day: 'numeric'});
  }

  goto(id: string) {
    this.router.navigate([`${id}`], {relativeTo: this.activatedRoute});
  }

  toggleStar(email: any) {
    if (email.labels.includes('starred')) {
      this.store.dispatch(EmailAction.deleteLabel({id: email._id, label: 'starred'}));
    } else {
      this.store.dispatch(EmailAction.addLabel({id: email._id, label: 'starred'}));
    }
  }
}
