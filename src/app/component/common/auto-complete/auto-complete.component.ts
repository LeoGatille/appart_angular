import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../../../class/wine/category';
import {Wine} from '../../../class/wine/wine';
import {Observable, Subscription} from 'rxjs';
import {CategoryService} from '../../../service/wine/category.service';
import {map, startWith} from 'rxjs/operators';
import {Color} from '../../../class/wine/color';
import {ColorService} from '../../../service/wine/color.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() listOfElements: any[];
  @Input() parentModel: any;
  @Input() displayFn: any;
  @Input() callBackFilter: any;

  myControl = new FormControl();
  filteredElements: Observable<any[]>;
  constructor() {
  }
  ngOnInit() {
    this.filteredElements = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): any[] {
    if (value && typeof value === 'string' ) {
      const filterValue = value.toLowerCase();
      return this.listOfElements.filter(this.callBackFilter(filterValue));
    }
    return this.listOfElements;
  }

  elementChanged() {
    if ( typeof this.parentModel === 'string') {
      this.parentModel = null;
    }
  }
}
