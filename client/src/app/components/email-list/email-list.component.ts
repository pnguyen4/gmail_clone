import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { FooterComponent } from '../footer/footer.component';
import { selectEmails } from '../../store/email/email.selectors';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  emails$ = this.store.select(selectEmails);

  constructor(private store: Store) { }

  ngOnInit(): void { }

  dateFormat(mydate: string): string {
    let date = new Date(mydate);
    return date.toLocaleString('en-US', {month: 'short', day: 'numeric'});
  }

}
