import { map } from 'rxjs/operators';
import { AllergenService } from './../../service/food/allergen.service';
import { inject } from '@angular/core/testing';
import { ServiceLocator } from './../serviceLocator';
import { DialogManger } from './../dialogManager';
import { Food } from './food';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Allergen implements AutoCompleteInterface{
  service: AllergenService = ServiceLocator.injector.get(AllergenService);
  id: number;
  allergenName: string;
  foods: Food[];
  public getName() {
    return this.allergenName;
  } 
  public create(): Promise<any> {
    return new Promise(() => {});
  }
  public getFoods(): Food[] {
    return this.foods;
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
   return this.service.editAllergen(newName, this.id)
      .toPromise()
      .then(() => {return this.sendResult(`Modification de ${this.getName()}`)})
      .catch((err) => {return this.sendResult(err.error)});
  }
  public askForDeletion(): Promise<any>  {
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
    return this.service.deleteAllergen(id)
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

