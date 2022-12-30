import { Component, OnInit } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  emails: any[] = [];

  constructor(private email: EmailService) { }

  ngOnInit(): void {
    this.email.fetchEmailList('inbox').subscribe(data => {
      if (data.status == "success") {
        this.emails = data.emails;
      }
    });
  }

}
