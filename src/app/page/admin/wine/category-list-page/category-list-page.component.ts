import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.css']
})
export class CategoryListPageComponent implements OnInit {

  categories: Category[];
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

}
