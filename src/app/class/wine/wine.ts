import {Category} from './category';
import {Designation} from './designation';
import {Color} from './color';
import {Label} from './label';
import {Vintage} from './vintage';

export class Wine {
  id: number;
  wineName: string;
  winePrice: number;
  wineAging: boolean;
  unavailable: boolean;
  category: Category;
  designation: Designation;
  color: Color;
  label: Label;
  vintage: Vintage;
}
