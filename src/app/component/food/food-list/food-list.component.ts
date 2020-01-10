import { Component, OnInit } from '@angular/core';
import {FoodService} from '../../../service/food/food.service';
import {Food} from '../../../class/food/food';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  public foods: Food[];
  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.foodService.getAllFood()
      .subscribe((foods: Food[]) => {
        this.foods = foods;
      });
  }

}
