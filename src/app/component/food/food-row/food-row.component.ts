import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Food} from '../../../class/food/food';
import {WineService} from '../../../service/wine/wine.service';
import {FoodService} from '../../../service/food/food.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';
import {Allergen} from '../../../class/food/allergen';

@Component({
  selector: 'app-food-row',
  templateUrl: './food-row.component.html',
  styleUrls: ['./food-row.component.scss']
})
export class FoodRowComponent implements OnInit {

  @Input() food: Food;
  @Output() editData = new EventEmitter<any>();
  loading = true;
 // showAllergens = false;
  tooltip: string = null;
  tata = 'boooooom';
  allAllergens: string[] = [];
  patchForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private foodService: FoodService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.createForm();
    this.getAllergensNames();

  }
  prepareTooltip() {
    this.tooltip = this.allAllergens.join();
    console.log('tooltip = ', this.tooltip);
    this.loading = false;
  }
  getAllergensNames() {
    this.food.allergen.forEach(allergen => {
      this.allAllergens.push(allergen.allergenName)
    });
    this.prepareTooltip();
  }
  createForm() {
    this.patchForm = this.fb.group({
      check : [this.food.display]
    });
  }
  // showFoodAllergens() {
  //   if (this.showAllergens) {
  //    return this.showAllergens = false;
  //   }
  //   return this.showAllergens = true;
  // }
  launchEdit(food: Food) {
    this.editData.emit(food);
  }
  patchFood(id) {
    this.foodService.patchFood(id, this.getBoolean(this.patchForm.value.check))
      .subscribe((res) => {
        console.log(res);
      });
  }
  getBoolean(val) {
    let checked = 2;
    if (val === true) {
      checked = 1;
    }
    return checked;
  }
  deleteFood() {
    this.foodService.deleteFood(this.food.id)
      .subscribe(() => {
        this.editData.emit();
      });
  }
  editFood(food: Food) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Edition',
      food,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        this.editData.emit();
        this.getAllergensNames();
      }
    );
  }
}
