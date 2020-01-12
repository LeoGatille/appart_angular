import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutoCompleteComponent} from '../auto-complete/auto-complete.component';

@Component({
  selector: 'app-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.css']
})
export class ValidateButtonComponent {
  @Output() testOutput = new EventEmitter<string>();
  sendable = 'Hello parent';
  sendToParent() {
    this.testOutput.emit(this.sendable);
  }
  send($event) {
    console.log('validateButton');
  }

  titi(){
    console.log('toto');
  }
}
