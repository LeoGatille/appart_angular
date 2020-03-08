import { Component, OnInit } from '@angular/core';
import {Formula} from '../../../../class/formula';
import {FormulaService} from '../../../../service/food/formula.service';
import {Label} from '../../../../class/wine/label';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-formula-page',
  templateUrl: './formula-page.component.html',
  styleUrls: ['./formula-page.component.scss']
})
export class FormulaPageComponent implements OnInit {

  allFormulas: Formula[];
  formatedFormulas: any[] = [];
  loading = true;
  constructor(
    private formulaService: FormulaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('INIT');
    this.getAll();
  }

  getAll() {
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

  createFormula($event) {
    this.formulaService.createFormula($event.nameControl, this.getDecimalPrice($event.numberControl), $event.descriptionControl)
      .subscribe((formula: Formula) => {
        this.getAll();
      });
    // console.log($event.numberControl);
  }

  getDecimalPrice(realPrice) {
    return realPrice * 100;
  }

  // deleteFormula(id) {
  //   this.formulaService.deleteFormula(id)
  //     .subscribe(() => { this.ngOnInit(); });
  // }

  delete(formula: Formula) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: formula.formulaName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.formulaService.deleteFormula(formula.id)
            .subscribe(() => {
              this.getAll();
            });
        }
      }
    );
  }

  addFormula($event) {
    this.allFormulas.push($event);
  }

  editInit(formula: Formula) {
    this.launchModalCreation(formula);
  }
  launchModalCreation(formula: Formula) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      modal: true,
      nameValue: formula.formulaName,
      descriptionValue: formula.description,
      numberValue: formula.formulaPrice / 100,
      nameField: true,
      numberField: true,
      descriptionField: true,
      title: 'Modification' ,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.editLabel(data, formula.id)
    );
  }
  editLabel(data, id) {
    this.formulaService.editFormula(id, data.nameControl, this.getDecimalPrice(data.numberControl), data.descriptionControl,)
      .subscribe( () => {
        this.getAll();
      });
  }
}
