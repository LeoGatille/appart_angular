import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-router-box',
  templateUrl: './router-box.component.html',
  styleUrls: ['./router-box.component.scss']
})
export class RouterBoxComponent implements OnInit {

  @Input() marker : string = null;
  constructor() { }

  ngOnInit() {
  }

  mouseOver() {
   const editBox = document.getElementById(this.marker);
   let editBoxClass = editBox.className;
   console.log("editbox = ", editBoxClass)
   if(editBoxClass === 'edit-box-hide') {
     editBox.className = 'edit-box-show';
    } else {
      editBox.className = 'edit-box-hide';
   }
  }
}