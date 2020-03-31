import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from '../../../../class/event';
import {EventService} from '../../../../service/event.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';
import {ToastrService} from 'ngx-toastr';

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
  allFoods: Food[] = [];
  foodsId: number[] = [];
  allTypes: Type[] = [];
  loading = true;
  entrees: any[] = [];
  plats: any[] = [];
  desserts: any[] = [];
  constructor(
    private typeService: TypeService,
    private eventService: EventService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    console.log('event === ', this.event.food);
    this.createForm();
    this.getDate();
  }

  getDate() {
    console.log('EVENT = ', new Date(this.event.eventDate.timestamp * 1000));
    
   this.date = new Date(this.event.eventDate.timestamp * 1000);
  }

  createForm() {
    this.editEvent = this.fb.group({
      name : [this.event.eventName, Validators.required],
      description : [this.event.eventDescription, Validators.required],
      date : [new Date(this.event.eventDate.timestamp * 1000), Validators.required],
      priceNoDrinks : [this.event.priceNoDrinks / 100, Validators.required],
      priceWithDrinks : [this.event.priceWithDrinks / 100, Validators.required],
      foodControl : [''],
      // typeControl : [''],
    });
    if (this.event.food) {
      this.getFoods();
      this.getTypes();
    }
  }

  


  getTypes() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
        this.loading = false;
    });
  }
  getFoods() {
    this.allFoods = this.event.food;
    console.log('FOOD = ', this.allFoods);
    this.getFoodsId();
  }
  getFoodsId() {
    this.allFoods.forEach(food => {
      this.foodsId.push(food.id);
      if (food.type.id === 1) {
        this.entrees.push(food);
      }
      if (food.type.id === 2) {
        this.plats.push(food);
      }
      if (food.type.id === 3) {
        this.desserts.push(food);
      }
    });
  }
  getSelectedFood(food: Food) {
    this.allFoods.push(food);
    this.foodsId.push(food.id);
  }

  getDecimalPrice(price: number) {
    return price * 100;
  }
  save() {
    const val = this.editEvent.value;
    console.log('save = ', this.foodsId);
    const timestamp = val.date.getTime();
    this.eventService.editEvent(
      this.event.id,
      timestamp,
      val.description,
      val.name,
      this.getDecimalPrice(val.priceNoDrinks),
      this.getDecimalPrice(val.priceWithDrinks),
      this.foodsId
    ).subscribe((event: Event) => {
      this.toast.success('Modification de ' + event.eventName);
      this.close.emit();
    });
  }
  removeFood(id) {
    this.foodsId.splice(this.foodsId.indexOf(id), 1);
    this.allFoods.splice(this.foodsId.indexOf(id), 1);
    console.log('foodId = ', this.foodsId);
  }

}
