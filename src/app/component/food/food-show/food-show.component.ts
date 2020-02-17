import { Component, OnInit } from '@angular/core';
import {FoodService} from '../../../service/food/food.service';

@Component({
  selector: 'app-food-show',
  templateUrl: './food-show.component.html',
  styleUrls: ['./food-show.component.scss']
})
export class FoodShowComponent implements OnInit {

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
  }

}
