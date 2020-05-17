import { Food } from './food/food';
import { Wine } from './wine/wine';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
export interface CrudInterface {
    service: any;
    create(): Promise<any>;
    initEdition(): Promise<any>;
    askForDeletion(): Promise<any>;
    getName(): string;
    getWines?(): Wine[] | Food[];
    getFoods?(): Food[];
    wines?: Wine[];
    foods?: Food[];
}