import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Food} from '../../../class/food/food';
import {WineService} from '../../../service/wine/wine.service';
import {FoodService} from '../../../service/food/food.service';

@Component({
  selector: 'app-food-row',
  templateUrl: './food-row.component.html',
  styleUrls: ['./food-row.component.css']
})
export class FoodRowComponent implements OnInit {

  loading = true;
  showAllergens = false;
  @Input() food: Food;
  @Output() editData = new EventEmitter<any>();
  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.loading = false;
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
  deleteFood() {
    this.foodService.deleteFood(this.food.id)
      .subscribe();
  }
}
