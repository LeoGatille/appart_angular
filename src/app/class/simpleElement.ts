import { AutoCompleteInterface } from 'src/app/class/autoCompleteInteface';
export class SimpleElement {
    constructor(parent: AutoCompleteInterface) {
        this.name = parent.getName();
    }
    name: string;
}