import {Component, Input, OnInit} from '@angular/core';
import {Type} from '../../../../class/food/type';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {FoodService} from '../../../../service/food/food.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Allergen} from '../../../../class/food/allergen';
import {Color} from '../../../../class/wine/color';
import {AllergenService} from '../../../../service/food/allergen.service';

@Component({
  selector: 'app-food-list-page',
  templateUrl: './food-list-page.component.html',
  styleUrls: ['./food-list-page.component.css']
})
export class FoodListPageComponent implements OnInit {
  // allergens: Allergen[];
  foodForm: FormGroup;
  stockAllergen: Allergen;
  allergens: Allergen[];
  allergensId = [];
  allergenControl: FormControl;
  food: Food;
  createAutoElement = false;
  listToAdd: any[];
  allTypes: Type[];
  loading = true;
  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private foodService: FoodService,
    private allergenService: AllergenService,
  ) {
    this.food = new Food();
    const allergenP = this.allergenService.getAllAllergens().toPromise();
    Promise.resolve(allergenP).then((data: any) => {
      this.stockAllergen = allergenP[0];
      console.log(allergenP[0]);
      this.allergenControl = new FormControl(this.stockAllergen, Validators.required);
      this.allergens = data;
      this.foodForm = this.fb.group({
        allergenControl : this.allergenControl,
        descriptionControl : ['', Validators.required],
        nameControl : ['', Validators.required],
        typeControl : ['', Validators.required]
      });
      this.loading = false;
    });
  }

  ngOnInit() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
      });
    this.loading = false;
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
    }
  }
  save() {
    const val = this.foodForm.value;
    this.foodService.createFood(val.nameControl, val.descriptionControl, val.typeControl.id, this.allergensId)
      .subscribe(() => { this.ngOnInit(); });
  }

}
