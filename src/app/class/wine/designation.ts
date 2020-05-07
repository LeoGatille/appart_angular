import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Designation implements AutoCompleteInterface, WineGetterInterface{
  id: number;
  designationName: string;
  wines: Wine[];
  public getName() {
    return this.designationName;
  } 
  public getWines(): Wine[] {
    return this.wines;
  }
}
