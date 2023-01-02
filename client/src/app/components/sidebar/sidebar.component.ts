import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';
import { LabelAction } from '../../store/label/label.actions';

import { selectAllLabels, selectCurrentLabel } from '../../store/label/label.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  labels$ = this.store.select(selectAllLabels);
  curlabel$ = this.store.select(selectCurrentLabel);
  labelname = new FormControl('', Validators.required);
  labelprompt: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  showlabelprompt(): void {
    this.labelprompt = true;
  }

  hidelabelprompt(): void {
    this.labelprompt = false;
  }

  createLabel(): void {
    if (this.labelname.valid && typeof this.labelname?.value == "string") {
      const label = this.labelname.value;
      this.store.dispatch(LabelAction.createNewLabel({label}));
      this.labelname.reset();
      this.labelprompt = false;
    }
  }

}
