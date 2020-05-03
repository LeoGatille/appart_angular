import { AutoCompleteInterface } from '../autoCompleteInteface';

export class Allergen implements AutoCompleteInterface{
  id: number;
  allergenName: string;
  public getName() {
    return this.allergenName;
  } 
}
