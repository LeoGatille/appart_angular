import { resolve } from 'url';
import { DialogManger } from './../dialogManager';
import { ServiceLocator } from './../serviceLocator';
import { HttpClient, HttpHandler, HttpRequest, ɵHttpInterceptingHandler, HttpXhrBackend, HttpBackend } from '@angular/common/http';
import { Globals } from './../../globals';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from './../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { CrudInterface } from './../curdInterface';
import { CategoryService } from './../../service/wine/category.service';
import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';
import { Injectable, Injector, Component, Provider } from '@angular/core';
import { globalAgent } from 'http';
import { root } from 'rxjs/internal/util/root';


export class Category implements AutoCompleteInterface, WineGetterInterface, CrudInterface {
  constructor(
  ) {}
  service: CategoryService = ServiceLocator.injector.get(CategoryService);
  id: number | null;
  categoryName: string;
  categoryOrder: number;
  wines: Wine[];
  public getName() {
    return this.categoryName;
  } 
  public getWines(): Wine[] {
    return this.wines;
  }
  public create(): Promise<any> {
    return new Promise(() => {});
  }
  public initEdition(): Promise<any> {
    const editionDialog = new DialogManger();
   return editionDialog.launchEditionModal(this.getName()).then((newName : string) => {
     if(newName === '') {
       return;
     }
      return this.edit(newName);
    });
  }
  private edit(newName) {
    if((newName === null || newName === undefined || newName === '' ) {
      return new Promise((resolve, reject ) => {

      }).then()
    }
   return this.service.editCategory(newName, this.id)
      .toPromise()
      .then(() => {return this.sendResult(`Modification de ${this.getName()}`)})
      .catch((err) => {return this.sendResult(err.error)});
  }
  public askForDeletion() {
    const suppressionDialog = new DialogManger();
   return suppressionDialog.launchSuppressionModal(this.getName()).then((confirm: boolean) => {
      if(confirm) {
        return this.delete(this.id);
      } 
    }).catch(err => {
      console.log(err);
    })
  }
  private delete(id: number) {
    return this.service.deleteCategory(id)
      .pipe(
        map((val)=> {this.getName()})
      )
      .toPromise()
      .then(() => {return this.sendResult(`Suppression de ${this.getName()}`);})
      .catch(() => {return this.sendResult();} );
  }
  private sendResult(succes: string = null) :string {
    console.log('SendResult');
    return succes ? succes : 'Une erreur est survenue';
  }
}
