import { promise } from 'protractor';
import { CrudInterface } from './../../../../class/curdInterface';
import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../class/wine/category';
import {CategoryService} from '../../../../service/wine/category.service';
import {ActivatedRoute} from '@angular/router';
import {Allergen} from '../../../../class/food/allergen';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';
import { first, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-category-list-page',
  templateUrl: './category-list-page.component.html',
  styleUrls: ['./category-list-page.component.scss']
})
export class CategoryListPageComponent implements OnInit {

  listToAdd: Category[];
  class: Category;
  placeholderName: string;
  categoryPromise: any;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private toast: ToastrService,
  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log('toto', params);
      });
  }

  ngOnInit() {
    this.placeholderName = 'Nom';
    this.getCategories();
   }
   getCategories(force = false) {
     this.categoryPromise = (bool) => this.categoryService.getAllCategories((force));
     this.categoryPromise().then((data: any[]) => {
       this.listToAdd = data;
     });
   }

  createCategory(formValue) {
    this.categoryService.create(formValue.nameControl)
      .subscribe((category: Category) => {
        this.listToAdd.push(category);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  edit(toEdit: CrudInterface) {
    toEdit.initEdition()
      .then((promise) => {
        Promise.resolve(promise)
          .then((message: string) => {
            if(message === null || message === undefined || message === '') {
              return;
            }
            console.log('cest moi = ', message);
            this.toast.success(message);
            this.getCategories(true);
          })
          .catch((message: string) => {
            this.toast.error(message);
          })
      }).catch((error) => {
        this.toast.error(error);
      })
  }

  delete(toDelete: CrudInterface) {
    const promiseOfDeletion = toDelete.askForDeletion();
    promiseOfDeletion.then((promise) => {
      const promiseOfmessage = Promise.resolve(promise);
      return promiseOfmessage.then((message: string) => {
        if(message) {
          this.toast.success(message);
          this.getCategories(true);
        }
      }).catch((message: string) => {
        this.toast.error(message);
      });
    }).catch((message: string) => {
      this.toast.error(message);
    });
  }
}
