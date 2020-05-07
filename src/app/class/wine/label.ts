import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Label implements AutoCompleteInterface, WineGetterInterface {
  id: number;
  labelName: string;
  wines: Wine[];
  public getName() {
    return this.labelName;
  } 
  public getWines(): Wine[] {
    return this.wines;
  }
}
