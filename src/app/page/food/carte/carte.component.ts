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
      .subscribe((fomrulas: Formula[]) => {
        this.allFormulas = fomrulas;
        this.loading = false;
      });
  }
}
