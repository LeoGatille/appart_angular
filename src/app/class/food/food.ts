import {Allergen} from './allergen';
import {Type} from './type';

export class Food {
  id: number;
  foodName: string;
  foodDescription: string;
  display: boolean;
  type: Type;
  allergen: Allergen[];
}
