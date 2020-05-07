import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Vintage implements AutoCompleteInterface, WineGetterInterface{
  id: number;
  vintageYear: number;
  wines: Wine[];
  public getName() {
    return this.vintageYear.toString();
  } 
  public getWines(): Wine[] {
    return this.wines;
  }
}
