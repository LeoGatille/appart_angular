import {Component, Input, OnInit} from '@angular/core';
import {Type} from '../../../../class/food/type';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {FoodService} from '../../../../service/food/food.service';
import {FormControl} from '@angular/forms';
import {Allergen} from '../../../../class/food/allergen';
import {Color} from '../../../../class/wine/color';
import {AllergenService} from '../../../../service/food/allergen.service';

@Component({
  selector: 'app-food-list-page',
  templateUrl: './food-list-page.component.html',
  styleUrls: ['./food-list-page.component.css']
})
export class FoodListPageComponent implements OnInit {
  autoElements: any[];
  parentModel: Allergen;
  allergensId: number[];
  food: Food;
  createAutoElement = false;
  find: any;
  listToAdd: any[];
  myControl: FormControl;
  activateButton = true;
  selectElements: any[];
  elementAttribut: any;
  allTypes: Type[];
  autoControl: FormControl;
  loading = true;
  constructor(
    private typeService: TypeService,
    private foodService: FoodService,
    private allergenService: AllergenService,
  ) {
    this.createAutoElement = true;
    this.autoControl = new FormControl(this.food.allergen);
    this.allergenService.getAllAllergens()
      .subscribe((allergens: Allergen[]) => {
        this.autoElements = allergens;
      });
    this.food = new Food();
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
  activateNewAutoElement(val) {
    if (typeof val === 'string') {
      // console.log('activateNewCategory = ' + this.categories.some((sample) => sample.categoryName === val));
      this.activateButton =  this.autoElements.some((sample) => sample.allergenName.toLowerCase() === val.toLowerCase());
    }
  }
  setAutoElement($event) {
    if (!$event) {
      return;
    }
    this.allergensId.push($event.id);
  }

}
