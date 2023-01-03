import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss']
})
export class ComposerComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closeComposer(): void {
    this.closeEvent.emit();
    // TODO: reset form as well
  }
}
