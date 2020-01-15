import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';
import {ActivatedRoute} from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.categoryService.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.listToAdd = categories;
      });
  }
  createElement($event) {
    console.log($event);
    this.categoryService.createCategory($event.nameControl, $event.numberControl)
      .subscribe( (category: Category) => {
        this.listToAdd.push(category);
      });
  }
  delete(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe();
  }
}
