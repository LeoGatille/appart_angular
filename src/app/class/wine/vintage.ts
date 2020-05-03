import {Wine} from './wine';
import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Vintage implements AutoCompleteInterface{
  id: number;
  vintageYear: number;
  wines: Wine[];
  public getName() {
    return this.vintageYear.toString();
  } 
}
