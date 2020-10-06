import { Wine } from './wine/wine';
export interface PromiseInterface {
    getWines(): Wine[];
    getName(): string; 
}