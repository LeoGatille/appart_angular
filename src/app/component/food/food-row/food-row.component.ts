import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Food} from '../../../class/food/food';
import {WineService} from '../../../service/wine/wine.service';
import {FoodService} from '../../../service/food/food.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';

@Component({
  selector: 'app-food-row',
  templateUrl: './food-row.component.html',
  styleUrls: ['./food-row.component.css']
})
export class FoodRowComponent implements OnInit {

  loading = true;
  showAllergens = false;
  patchForm: FormGroup;
  @Input() food: Food;
  @Output() editData = new EventEmitter<any>();
  constructor(
    public dialog: MatDialog,
    private foodService: FoodService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.createForm();
  }
  createForm() {
    this.patchForm = this.fb.group({
      check : [this.food.display]
    });
  }
  showFoodAllergens() {
    if (this.showAllergens) {
     return this.showAllergens = false;
    }
    return this.showAllergens = true;
  }
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
      food,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  this.editData.emit()
    );
  }
}
