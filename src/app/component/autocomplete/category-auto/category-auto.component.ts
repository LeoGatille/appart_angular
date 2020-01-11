import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../../../class/wine/category';
import {Observable} from 'rxjs';
import {CategoryService} from '../../../service/wine/category.service';
import {map, startWith} from 'rxjs/operators';
import {Wine} from '../../../class/wine/wine';

@Component({
  selector: 'app-category-auto',
  templateUrl: './category-auto.component.html',
  styleUrls: ['./category-auto.component.css']
})
export class CategoryAutoComponent implements OnInit {

  categoryControl = new FormControl();
  options: Category[];
  wine: Wine;
  filteredOptions: Observable<Category[]>;
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.wine = new Wine();
    this.categoryService.getAllCategories().toPromise().then((categories: Category[]) => {
      this.options = categories;
      this.wine.category = categories[0];
      this.filteredOptions = this.categoryControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }
  displayFn(category: Category): string {
    return category ? category.categoryName : '';
  }
  private _filter(value: string): Category[] {
    if (value && typeof value === 'string' ) {
      const filterValue = value.toLocaleLowerCase();
      return this.options.filter(category => {
        return category.categoryName.toLowerCase().includes(filterValue);
      });
    }
    return this.options;
  }

  categoryChanged() {
    if ( typeof this.wine.category === 'string') {
      this.wine.category = null;
    }
    console.log(this.wine);
  }
}
