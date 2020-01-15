import {Wine} from './wine';

export class Category {
  id: number;
  categoryName: string;
  categoryOrder: number;
  wines: Wine[];
}
