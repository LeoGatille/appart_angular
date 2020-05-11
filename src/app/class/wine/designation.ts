import { map } from 'rxjs/operators';
import { ServiceLocator } from './../serviceLocator';
import { DesignationService } from './../../service/wine/designation.service';
import { DialogManger } from './../dialogManager';
import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Designation implements AutoCompleteInterface, WineGetterInterface{
  service: DesignationService = ServiceLocator.injector.get(DesignationService);
  id: number;
  designationName: string;
  wines: Wine[];
  public getName() {
    return this.designationName;
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
    if((newName === null || newName === undefined || newName === '' )) {
      return new Promise((resolve, reject ) => {

      }).then()
    }
   return this.service.editDesignation(newName, this.id)
      .toPromise()
      .then(() => {return this.sendResult(`Modification de ${this.getName()}`)})
      .catch((err) => {return this.sendResult(err.error)});
  }
  public askForDeletion(): Promise<any>  {
    if(this.getWines().length >= 1) {
      return Promise.reject(new Error('La catégory est liée à un ou plusieurs Vins'));
    }
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
    return this.service.deleteDesignation(id)
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
