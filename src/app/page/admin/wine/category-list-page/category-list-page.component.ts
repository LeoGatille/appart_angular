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

  editId: number;
  categoryNameEdit: string | null;
  action: string;
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
    this.action = 'list';
    this.categoryNameEdit = null;
    this.placeholderName = 'Nom';
    this.categoryService.getAllCategories()
      .subscribe((categories: Category[]) => {
        this.listToAdd = categories;
      });
  }
  createElement($event) {
    console.log($event);
    if (this.action === 'list') {
      this.categoryService.createCategory($event.nameControl)
        .subscribe( (category: Category) => {
          this.listToAdd.push(category);
        });
    } else {
      this.categoryService.editCategory($event.nameControl, this.editId)
        .subscribe( () => { this.ngOnInit(); } );
    }
  }
  editMod(id: number) {
    this.categoryService.getOneCategory(id)
      .subscribe((category: Category) => {
        this.categoryNameEdit = category.categoryName;
        this.editId = category.id;
        this.action = 'edit';
      });
  }
  delete(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe();
  }
  changeAction() {
    if (this.action !== 'list') {
      this.action = 'list';
      this.categoryNameEdit = null;
    }
  }
}
