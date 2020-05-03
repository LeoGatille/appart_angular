import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Category implements AutoCompleteInterface {
  id: number;
  categoryName: string;
  categoryOrder: number;
  wines: Wine[];
  public getName() {
    return this.categoryName;
  } 
}
