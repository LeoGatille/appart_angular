import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() listToAdd: any[];
  dialog: this;
  constructor() { }

  ngOnInit() {
    console.log(this.listToAdd);
  }

}
