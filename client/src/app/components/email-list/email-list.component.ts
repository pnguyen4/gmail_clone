import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  label: string =  "";

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.label = params.get('label') ?? 'inbox';
    });

  }

}
