import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Designation implements AutoCompleteInterface{
  id: number;
  designationName: string;
  wines: Wine[];
  public getName() {
    return this.designationName;
  } 
}
