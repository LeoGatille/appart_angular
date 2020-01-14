import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';
import {Color} from '../../../../class/wine/color';
import {ColorService} from '../../../../service/wine/color.service';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.css']
})
export class CategoryListPageComponent implements OnInit {

  listToAdd: Category[];
  class: Category;
  placeholderName: string;
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.categoryService.getAllCategories()
      .subscribe((category: Category[]) => {
        this.listToAdd = category;
      });
  }
  createElement($event) {
    console.log($event);
    this.categoryService.createCategory($event.nameControl, $event.numberControl)
      .subscribe( (category: Category) => {
        this.listToAdd.push(category);
      });
  }
}
