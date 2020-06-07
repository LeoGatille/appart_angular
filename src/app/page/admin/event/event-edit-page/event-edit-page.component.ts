import { FoodService } from './../../../../service/food/food.service';
import { Food } from './../../../../class/food/food';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../../../../class/event';
import { EventService } from '../../../../service/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../../../service/food/type.service';
import { Type } from '../../../../class/food/type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-edit-page',
  templateUrl: './event-edit-page.component.html',
  styleUrls: ['./event-edit-page.component.scss']
})
export class EventEditPageComponent implements OnInit {
  @Input() event: Event = null;
  @Output() close = new EventEmitter<any>();

  date: any = null;
  editEvent: FormGroup;
  selectedFoodsId: number[] = [];
  allTypes: Type[] = [];
  loading = true;
  constructor(
    private typeService: TypeService,
    private eventService: EventService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    console.log('eventToedit = ', this.event);
    this.getAllTypes();
    this.createForm();
    this.getDate();
  }

  getAllTypes(): void {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
        // this.getSelectedFoods()
        this.loading = false;
      });
  }

  isAlreadySelected(anyFoodId) {
    let findRedundancy = this.event.food.find((food: Food) => food.id === anyFoodId);
    if (!findRedundancy) {
      return false;
    }
    return true;
  }

  createForm() {
    this.editEvent = this.fb.group({
      name: [this.event.eventName, Validators.required],
      description: [this.event.eventDescription, Validators.required],
      date: [new Date(this.event.eventDate.timestamp * 1000), Validators.required],
      priceNoDrinks: [this.event.priceNoDrinks / 100, Validators.required],
      priceWithDrinks: [this.event.priceWithDrinks / 100, Validators.required],
      foodControl: [''],
      // typeControl : [''],
    });
  }

  getDate() {
    this.date = new Date(this.event.eventDate.timestamp * 1000);
  }

  removeFood(id) {
    console.log(this.event.food.findIndex(food => food.id === id));

    this.event.food.splice(this.event.food.findIndex(food => food.id === id), 1)

    //foodTab.indexOf((food: Food) => food.id === id)
    // this.selectedFoodsId.splice(this.selectedFoodsId.indexOf(id), 1);
  }

  addSelectedFood(food: Food, type: Type) {

    food.type = type;
    console.log('FOOD = ', food, ' TYPE = ', type);
    this.event.food.push(food);
    //   this.selectedFoodsId.push(food.id);
  }

  getDecimalPrice(price: number) {
    return price * 100;
  }
  getFoodsId(foodTab: Food[]) {
    const foodsId = [];
    foodTab.forEach(food => {
      foodsId.push(food.id);
    });
    return foodsId;
  }

  save() {
    const val = this.editEvent.value;
    const timestamp = val.date.getTime();
    this.eventService.editEvent(
      this.event.id,
      timestamp + 8640000,
      val.description,
      val.name,
      this.getDecimalPrice(val.priceNoDrinks),
      this.getDecimalPrice(val.priceWithDrinks),
      this.getFoodsId(this.event.food)
    ).subscribe((event: Event) => {
      this.toast.success('Modification de ' + event.eventName);
      this.close.emit();
    });
  }
}
