import { Component, OnInit } from '@angular/core';
import {FoodService} from '../../../service/food/food.service';
import {Food} from '../../../class/food/food';
import {TypeService} from '../../../service/food/type.service';
import {Type} from '../../../class/food/type';
import {FormulaService} from '../../../service/food/formula.service';
import {Formula} from '../../../class/formula';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  loading = true;
  allTypes: Type[] = null;
  allFormulas: Formula[] = null;
  formatedFormulas: any[] = [];

  constructor(
    private typeService: TypeService,
    private formulaService: FormulaService,
  ) { }

  ngOnInit() {
    this.getTypes();
  }
  getTypes() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
        this.getFormulas();
    });
  }
  getFormulas() {
    this.formulaService.getAllFormulas()
      .subscribe((formulas: Formula[]) => {
        this.allFormulas = formulas;
        this.realPrice(this.allFormulas);
        this.loading = false;
      });
  }

  realPrice(tab: Formula[]) {
    this.formatedFormulas = [];
    this.allFormulas.forEach((formula: Formula) => {
      let newFormula: any;
      newFormula = formula;
      newFormula.realPrice = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(formula.formulaPrice / 100));
      this.formatedFormulas.push(newFormula);
    });
  }
}
