import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Food} from '../../../class/food/food';
import {WineService} from '../../../service/wine/wine.service';
import {FoodService} from '../../../service/food/food.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../dialog/dialog.component';
import {Allergen} from '../../../class/food/allergen';
import {User} from '../../../class/user';
import {AuthService} from '../../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

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
  allAllergens: string[] = [];
  patchForm: FormGroup;
  user: User;
  constructor(
    public dialog: MatDialog,
    private foodService: FoodService,
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {

    this.createForm();
    this.getAllergensNames();

  }
  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }
  prepareTooltip() {
    this.tooltip = this.allAllergens.join();
    console.log('tooltip = ', this.tooltip);
    this.loading = false;
  }
  getAllergensNames() {
    this.food.allergen.forEach(allergen => {
      if (this.allAllergens.indexOf(allergen.allergenName)) {
        this.allAllergens.push(allergen.allergenName);
      }

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


  delete(food: Food) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: food.foodName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.foodService.deleteFood(this.food.id)
            .subscribe(() => {
              this.toast.success('Suppression effectuée');
              this.editData.emit();
            });
        }
      }
    );
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
