import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';
import {ActivatedRoute} from '@angular/router';
import {Wine} from '../../../../class/wine/wine';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  listToAdd: Category[];
  class: Category;
  myComponent: Category;
  linkedWines: Wine[];
  placeholderName: string;
  loading = true;
  id: number;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params.id;
        this.categoryService.getOneCategory(this.id)
          .subscribe((category: Category) => {
            this.loading = false;
            this.myComponent = category;
            this.linkedWines = this.myComponent.wines;
            console.log(this.myComponent.categoryName);
            console.log(this.myComponent.categoryOrder);

          });
      });
  }

  ngOnInit() {
    // this.categoryService.getAllCategories()
    //   .subscribe((categories: Category[]) => {
    //     this.listToAdd = categories;
    //   });
  }

  editElement($event) {
    this.categoryService.editCategory($event.nameControl, this.id)
      .subscribe();
  }

}
