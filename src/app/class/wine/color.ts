import { StupidNameInterface } from './../stupidNameInterface';
import { WineGetterInterface } from './../wineGetterInterface';
import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Color implements AutoCompleteInterface, WineGetterInterface, StupidNameInterface {
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
}
