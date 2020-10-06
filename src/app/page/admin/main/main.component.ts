import { log } from 'util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
vin: '/vins'
  ngOnInit() {
  }

  mouseOver(target) {
   const editBox = document.getElementById(`edit-${target}`);
   let editBoxClass = editBox.className;
   console.log("editbox = ", editBoxClass)
   if(editBoxClass === 'edit-box-hide') {
     editBox.className = 'edit-box-show';
    } else {
      editBox.className = 'edit-box-hide';
   }
  }
}
