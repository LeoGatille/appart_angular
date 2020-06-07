import { Message } from './../../../../class/message';
import { promise } from 'protractor';
import { CrudInterface } from './../../../../class/curdInterface';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../class/wine/category';
import { CategoryService } from '../../../../service/wine/category.service';
import { ActivatedRoute } from '@angular/router';
import { Allergen } from '../../../../class/food/allergen';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../../../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { first, catchError } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  loading = true;
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
      this.loading = false;
    });
  }
  createCategory(formValue) {
    this.categoryService.create(formValue.nameControl)
      .subscribe((category: Category) => {
        this.toast.success('Ajout effectué' + ' "' + category.categoryName + '"');
        this.listToAdd.push(category);
      },
        error => {
          this.toast.warning(error.error)
        });
  }
  childAskFor(request: any) {
    switch (request.action) {
      case ('refresh'):
        this.toast.success(request.message);
        this.getCategories(true);
        break;
      case ('error'):
        this.toast.warning(request.message);
        break;
      default:
        this.toast.warning('Une erreur est survenue');
        break;
    }
  }
}
