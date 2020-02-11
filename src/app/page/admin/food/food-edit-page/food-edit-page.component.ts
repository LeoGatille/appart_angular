import { Component, OnInit } from '@angular/core';
import {Food} from '../../../../class/food/food';
import {Allergen} from '../../../../class/food/allergen';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodService} from '../../../../service/food/food.service';
import {ActivatedRoute} from '@angular/router';
import {AllergenService} from '../../../../service/food/allergen.service';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';
import {log} from 'util';

@Component({
  selector: 'app-food-edit-page',
  templateUrl: './food-edit-page.component.html',
  styleUrls: ['./food-edit-page.component.css']
})
export class FoodEditPageComponent implements OnInit {

  display: number;
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
  allergenPromise: any;
  title = 'Allergen';

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
    this.allergenPromise = (bool) => this.allergenService.getAllAllergens(bool);
    this.allergenControl = new FormControl('', Validators.required);

    this.foodService.getOneFood(this.id)
       .subscribe((food: Food) => {
         this.food = food;
         this.selectedAllergens = this.food.allergen;
         this.createForm();
         this.loading = false;
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
    this.foodService.editFood(
      this.id, val.nameControl,
      val.descriptionControl,
      this.getBooelan(val.displayControl),
      val.typeControl.id,
      this.allergensId
    ).subscribe((res) => {
        console.log('res = ', res);
      });
  }
  toglle(event) {
    this.foodForm.patchValue({
      displayControl: event.checked
    });
    console.log(event);
    console.log(this.foodForm.value.displayControl);
  }

  getBooelan(val) {
    console.log(val);
    let checked = 2;
    if (val === true) {
      checked = 1;
    }
    return checked;
  }

  createForm() {
    this.foodForm = this.fb.group({
      allergenControl : this.allergenControl,
      descriptionControl : ['', Validators.required],
      nameControl : ['', Validators.required],
      typeControl : [ '' , Validators.required],
      displayControl : [this.food.display]
    });
  }
}
