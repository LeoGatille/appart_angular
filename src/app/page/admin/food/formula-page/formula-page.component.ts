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
  loading = true;
  constructor(
    private formulaService: FormulaService,
    private dialog: MatDialog,
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
      numberValue: formula.formulaPrice,
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
    this.formulaService.editFormula(id, data.nameControl, data.numberControl, data.descriptionControl,)
      .subscribe( () => {
        this.ngOnInit();
      });
  }
}
