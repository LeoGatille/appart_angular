import { Component, OnInit } from '@angular/core';
import {Vintage} from '../../../class/wine/vintage';
import {VintageService} from '../../../service/wine/vintage.service';

@Component({
  selector: 'app-vintage-list',
  templateUrl: './vintage-list.component.html',
  styleUrls: ['./vintage-list.component.css']
})
export class VintageListComponent implements OnInit {

  public vintages: Vintage[];
  constructor(
    private vintageService: VintageService
  ) { }

  ngOnInit() {
    this.vintageService.getAllVintages()
      .subscribe((vintages: Vintage[]) => {
        this.vintages = vintages;
      });
  }

}
