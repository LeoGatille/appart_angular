import {Category} from './category';
import {Designation} from './designation';
import {Color} from './color';
import {Label} from './label';
import {Vintage} from './vintage';
import {Status} from './status';

export class Wine {
  id: number;
  wineName: string;
  winePrice: number;
  wineAging: boolean;
  unavailable: boolean;
  category: Category | null;
  designation: Designation| null;
  color: Color| null;
  label: Label| null;
  vintage: Vintage| null;
  status: Status| null;
}
