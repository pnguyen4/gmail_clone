import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  emails: any[] = [];
  label: string =  "";

  constructor(private email: EmailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.label = params.get('label') ?? 'inbox';
    });

    this.email.fetchEmailList(this.label).subscribe(data => {
      if (data.status == "success") {
        this.emails = data.emails;
      }
    });
  }

}
