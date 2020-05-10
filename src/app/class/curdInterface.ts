import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
export interface CrudInterface {
    create(): Promise<any>;
    initEdition(): Promise<any>;
    askForDeletion(): Promise<any>;
    getName(): string;
}