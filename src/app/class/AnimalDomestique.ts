import { ControlLabelPipe } from './../pipe/wine/control-label.pipe';


export class AnimalDomestique {
    constructor(p: string, d: string) {
        this.proprio = p;
        this.toto = d;
    }
    public getProprio(): string {
        return this.proprio;
    }
    public toto: string;
    private proprio: string;
}

export class Chien extends AnimalDomestique{
    name: string;
    constructor(name: string, proprio: string, toto: string) {
        super(proprio, toto);
        this.name = name;
    }
}
let c = new AnimalDomestique("leo", 'tata');
