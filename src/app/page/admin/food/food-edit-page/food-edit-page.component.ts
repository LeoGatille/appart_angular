import { Component, OnInit } from '@angular/core';
import {Food} from '../../../../class/food/food';
import {Allergen} from '../../../../class/food/allergen';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodService} from '../../../../service/food/food.service';
import {ActivatedRoute} from '@angular/router';
import {AllergenService} from '../../../../service/food/allergen.service';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';

@Component({
  selector: 'app-food-edit-page',
  templateUrl: './food-edit-page.component.html',
  styleUrls: ['./food-edit-page.component.css']
})
export class FoodEditPageComponent implements OnInit {

  id: number;
  food: Food;
  allAllergens: Allergen[];
  allTypes: Type[];
  loading = true;
  allergenControl: FormControl;
  foodForm: FormGroup;
  allergensId: number[];
  selectedAllergens: Allergen[];
  type: Type;
  typeControl: FormControl;
  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private allergenService: AllergenService,
    private typeService: TypeService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.allergensId = [];
    this.activatedRoute.params
      .subscribe((params) => {
        this.id = params.id;
        return this.launchProcesses();
      });

  }
  launchProcesses() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
      });

    const allergenP = this.allergenService.getAllAllergens().toPromise();
    const oneFoodP = this.foodService.getOneFood(this.id).toPromise();
    Promise.all([allergenP, oneFoodP]).then((data: any) => {
      this.allAllergens = data[0];
      this.food = data[1];
      this.selectedAllergens = this.food.allergen;
      this.allergenControl = new FormControl(this.food.allergen[0]);
      this.foodForm = this.fb.group({
        myControl : this.allergenControl,
        descriptionControl : [this.food.foodDescription, Validators.required],
        nameControl : [this.food.foodName, Validators.required],
        typeControl : [this.food.type, Validators.required ]
      });
      this.loading = false;
      console.log('typeControl = ', this.typeControl);
    });
  }
  displayFn(allergen: Allergen): string {
    return allergen ? allergen.allergenName : '';
  }
  callBackFilter(filterValue) {
    return (allergen) => {
      return allergen.allergenName.toLowerCase().includes(filterValue);
    };
  }
  getAllergenId($event) {
    if (!$event) {
      return;
    }
    if (typeof $event.id === 'number') {
      this.allergensId.push($event.id);
      this.selectedAllergens.push($event);
      console.log('allergensId = ', this.allergensId);
    }
  }

  save() {
    const val = this.foodForm.value;
    console.log(this.id);
    this.foodService.editFood(this.id, val.nameControl, val.descriptionControl, val.typeControl.id, this.allergensId, )
      .subscribe();
  }
  selectLog(type: Type) {
    console.log(type);
  }
}
