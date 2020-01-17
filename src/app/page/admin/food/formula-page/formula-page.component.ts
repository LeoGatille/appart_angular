import { Component, OnInit } from '@angular/core';
import {Formula} from '../../../../class/formula';
import {FormulaService} from '../../../../service/food/formula.service';

@Component({
  selector: 'app-formula-page',
  templateUrl: './formula-page.component.html',
  styleUrls: ['./formula-page.component.css']
})
export class FormulaPageComponent implements OnInit {

  allFormulas: Formula[];
  loading = true;
  constructor(
    private formulaService: FormulaService
  ) { }

  ngOnInit() {
    console.log('INIT');
    this.formulaService.getAllFormulas()
      .subscribe((formulas: Formula[]) => {
        this.allFormulas = formulas;
        this.loading = true;
      });
    this.loading = false;
  }
  createFormula($event) {
    this.formulaService.createFormula($event.nameControl, $event.numberControl, $event.descriptionControl)
      .subscribe((formula: Formula) => {
        this.allFormulas.push(formula);
      });
    // console.log($event.numberControl);
  }
  deleteFormula(id) {
    this.formulaService.deleteFormula(id)
      .subscribe(() => { this.ngOnInit(); });
  }

}
