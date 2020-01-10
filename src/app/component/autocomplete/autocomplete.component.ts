import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ColorService} from '../../service/wine/color.service';
import {Color} from '../../class/wine/color';
import {Wine} from '../../class/wine/wine';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  vin: Wine;
  options: Color[];
  filteredOptions: Observable<Color[]>;
  constructor(
    private colorService: ColorService
  ) {

  }
  ngOnInit() {
    this.vin = new Wine();
    this.colorService.getAllColors().toPromise().then((colors: Color[]) => {
      this.options = colors;
      this.vin.color = colors[0];
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });

  }
  displayFn(color: Color): string {
    return color ? color.colorName : '';
  }
  private _filter(value: string): Color[] {
    if (value && typeof value === 'string' ) {
      const filterValue = value.toLowerCase();

      return this.options.filter(color => {
        return color.colorName.toLowerCase().includes(filterValue);
      });
    }
    return this.options;
  }

  colorChanged() {
    if ( typeof this.vin.color === 'string') {
      this.vin.color = null;
    }
    console.log(this.vin);
  }
}
