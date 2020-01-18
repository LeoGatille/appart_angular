import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../../../service/event.service';
import {FoodService} from '../../../../service/food/food.service';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  foodsId: number[];
  createEvent: FormGroup;
  allFoods: Food[];
  allTypes: Type[];
  loading = true;
  selectedEntrees: Food[];
  selectedPlats: Food[];
  selectedDesserts: Food[];
  constructor(
    private eventService: EventService,
    private foodService: FoodService,
    private typeService: TypeService,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
    this.foodsId = [];
    this.selectedEntrees = [];
    this.selectedPlats = [];
    this.selectedDesserts = [];
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
      });
    this.foodService.getAllFood()
      .subscribe((foods: Food[]) => {
        this.allFoods = foods;
      });
    this.createEvent = this.fb.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      date : ['', Validators.required],
      priceNoDrinks : ['', Validators.required],
      priceWithDrinks : ['', Validators.required],
      foodControl : ['', Validators.required],
      typeControl : ['', Validators.required],
    });
    this.loading = false;
  }
  getSelectedFood(food: Food, type: Type) {
    this.foodsId.push(food.id);
    if (type.id === 1) {
      this.selectedEntrees.push(food);
    }
    if (type.id === 2) {
      this.selectedPlats.push(food);
    }
    if (type.id === 3) {
      this.selectedDesserts.push(food);
    }
    console.log('FoodIds = ', this.foodsId);
  }
  save() {
    console.log('eventForm = ', this.createEvent.value);
  }
  reset() {
    this.foodsId = [];
    this.selectedDesserts = [];
    this.selectedEntrees = [];
    this.selectedPlats = [];
  }
}
