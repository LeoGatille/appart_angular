import { map } from 'rxjs/operators';
import { DialogManger } from './../dialogManager';
import { ServiceLocator } from './../serviceLocator';
import { ColorService } from './../../service/wine/color.service';
import { StupidNameInterface } from './../stupidNameInterface';
import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Color implements AutoCompleteInterface, WineGetterInterface, StupidNameInterface {
  service: ColorService = ServiceLocator.injector.get(ColorService);
  id: number;
  colorName: string;
  colorOrder: number;
  wines: Wine[];
 public getName(): string {
    return this.colorName;
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
   return this.service.editColor(newName, this.id)
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
    return this.service.deleteColor(id)
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
