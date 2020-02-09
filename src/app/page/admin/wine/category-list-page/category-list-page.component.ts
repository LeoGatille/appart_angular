import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';
import {ActivatedRoute} from '@angular/router';
import {Allergen} from '../../../../class/food/allergen';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.css']
})
export class CategoryListPageComponent implements OnInit {

  categoryNameEdit: string | null;
  action: string;
  listToAdd: Category[];
  class: Category;
  placeholderName: string;
  categoryPromise: any;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
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
    this.getCategories();
   }
   getCategories(force = false) {
     this.categoryPromise = (bool) => this.categoryService.getAllCategories((force));
     this.categoryPromise().then((data: any[]) => {
       this.listToAdd = data;
     });
   }

   createCategory($event) {
     console.log('event', $event);
     this.categoryService.create($event.nameControl)
       .subscribe((category: Category) => {
         this.listToAdd.push(category);
       });
   }
  editInit(id: number) {
    console.log('toto');
    this.categoryService.getOneCategory(id)
      .subscribe((category: Category) => {
        this.launchModalCreation(category);
      });
  }
  launchModalCreation(category: Category) {
    console.log('titi');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      value: category.categoryName,
      nameField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editCategory(data, category.id)
    );
  }
  editCategory(data, id) {
    this.categoryService.editCategory(data.nameControl, id)
      .subscribe( () => {
        this.getCategories(true);
      });
  }
  delete(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(() => {
        this.getCategories(true);
      });
  }
}
