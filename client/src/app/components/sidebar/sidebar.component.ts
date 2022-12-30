import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectAllLabels, selectCurrentLabel } from '../../store/label/label.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  labels$ = this.store.select(selectAllLabels);
  curlabel$ = this.store.select(selectCurrentLabel);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
