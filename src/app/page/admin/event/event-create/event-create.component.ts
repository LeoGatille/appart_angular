import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../../../service/event.service';
import {FoodService} from '../../../../service/food/food.service';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';
import {DatePipe} from '@angular/common';
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  @Output() allControllers = new EventEmitter<any>();

  @Input() eventId: number | null;
  @Input() action: string;
  @Input() oldName: string |null;
  @Input() oldDescription: string |null;
  @Input() oldDate: Date |null;
  @Input() oldPriceNoDrinks: number |null;
  @Input() oldPriceWithDrinks: number |null;
  @Input() oldFoodControl: Food[] |null;
  @Input() oldTypeControl: string |null;
  dataToParent: any[];
  foodsId: number[];
  createEvent: FormGroup;
  allFoods: Food[];
  allTypes: Type[];
  loading = true;
  selectedEntrees: Food[];
  selectedPlats: Food[];
  selectedDesserts: Food[];
  entreesId = 1;
  platsId = 2;
  dessertsId = 3;
  constructor(
    private eventService: EventService,
    private foodService: FoodService,
    private typeService: TypeService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
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
    if (type.id === this.entreesId) {
      this.selectedEntrees.push(food);
    }
    if (type.id === this.platsId) {
      this.selectedPlats.push(food);
    }
    if (type.id === this.dessertsId) {
      this.selectedDesserts.push(food);
    }
    console.log('FoodIds = ', this.foodsId);
  }
  save() {
    this.dataToParent = [];
    const val = this.createEvent.value;
    this.dataToParent.push(this.eventId, val, this.foodsId);
    this.allControllers.emit(this.dataToParent);
  }
  reset() {
    this.foodsId = [];
    this.selectedDesserts = [];
    this.selectedEntrees = [];
    this.selectedPlats = [];
  }

}
