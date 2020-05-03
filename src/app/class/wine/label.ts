import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Label implements AutoCompleteInterface {
  id: number;
  labelName: string;
  wines: Wine[];
  public getName() {
    return this.labelName;
  } 
}
