import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Color implements AutoCompleteInterface {
  id: number;
  colorName: string;
  colorOrder: number;
  wines: Wine[];
 public getName() {
    return this.colorName;
  }   
}
