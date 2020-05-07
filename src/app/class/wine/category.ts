import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Category implements AutoCompleteInterface, WineGetterInterface {
  id: number;
  categoryName: string;
  categoryOrder: number;
  wines: Wine[];
  public getName() {
    return this.categoryName;
  } 
  public getWines(): Wine[] {
    return this.wines;
  }
}
