import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { EmailAction } from '../../store/email/email.actions';
import { LabelAction } from '../../store/label/label.actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const label = params.get('label') ?? 'inbox';
      this.store.dispatch(LabelAction.setCurrentLabel({label}));
    });

  }

}
