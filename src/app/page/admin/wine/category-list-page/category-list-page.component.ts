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
    private toast: ToastrService,
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
     this.categoryService.create($event.nameControl)
       .subscribe((category: Category) => {
         this.toast.success('Ajout effectué' + ' "' + category.categoryName + '"');
         this.listToAdd.push(category);
       },
       error => {
         this.toast.error(error.error)
       });
   }
  editInit(id: number) {
    this.categoryService.getOneCategory(id)
      .subscribe((category: Category) => {
        this.launchModalCreation(category);
      });
  }
  launchModalCreation(category: Category) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      nameValue: category.categoryName,
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
      .subscribe( (category: Category) => {
        this.toast.success('Modification effectuée' + ' "' + category.categoryName + '"');
        this.getCategories(true);
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
          this.toast.success(message);
          this.getCategories(true);
        })
        .catch((message: string) => {
          this.toast.error(message);
        });
      }).catch((message: string) => {
        this.toast.error(message);
      });
  }

  // delete(category: Category) {
  //   const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     suppr: category.categoryName,
  //   };
  //   const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


  //   dialogRef.afterClosed().subscribe(
  //     data =>  {
  //       console.log('data === ', data);
  //       if (data) {
  //         this.categoryService.deleteCategory(category.id)
  //           .subscribe(() => {
  //             this.toast.success('Suppression effectuée' );
  //             this.getCategories(true);
  //           });
  //       }
  //     }
  //   );
  // }
}
