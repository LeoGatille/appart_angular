import {Component, Input, OnInit} from '@angular/core';
import {Type} from '../../../../class/food/type';
import {Food} from '../../../../class/food/food';
import {TypeService} from '../../../../service/food/type.service';
import {FoodService} from '../../../../service/food/food.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Allergen} from '../../../../class/food/allergen';
import {Color} from '../../../../class/wine/color';
import {AllergenService} from '../../../../service/food/allergen.service';
import {ModalService} from '../../../../component/test/modal';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-list-page',
  templateUrl: './food-list-page.component.html',
  styleUrls: ['./food-list-page.component.scss']
})
export class FoodListPageComponent implements OnInit {
  foodForm: FormGroup;
  stockAllergen: Allergen;
  allergens: Allergen[];
  allergensId = [];
  allergenControl: FormControl;
  food: Food;
  listToAdd: any[];
  allTypes: Type[];
  allAllergens: Allergen[];
  action: string;
  loading = true;
  title = 'Allergen';
  allergenPromise: any;
  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private foodService: FoodService,
    private allergenService: AllergenService,
    private modalService: ModalService,
    private toast: ToastrService,
  ) {

  }

  ngOnInit() {
    console.log('init');
    this.getFood();
    console.log('build');
    this.action = 'list';
    this.allAllergens = [];
    this.food = new Food();

    this.allergenPromise = (bool) => this.allergenService.getAllAllergens(bool);
    this.allergenControl = new FormControl(this.stockAllergen, Validators.required);
    this.createForm();
    this.loading = false;
  }

  getFood() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
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
      this.allAllergens.push($event);
    }
  }

  toglle(event) {
    this.foodForm.patchValue({
      displayControl: event.checked
    });
    console.log(event);
    console.log(this.foodForm.value.displayControl);
  }

  getBooelan(val) {
    let checked = 2;
    if (val === true) {
      checked = 1;
    }
    return checked;
  }

  save() {

    if (!this.foodForm.value.typeControl) {
      this.toast.error('Présiser le type');
    }
    const val = this.foodForm.value;
    this.foodService.createFood(val.nameControl,
      val.descriptionControl,
      this.getBooelan(val.displayControl),
      val.typeControl.id,
      this.allergensId
    ).subscribe((success: Food) => {
        this.toast.success('Ajout de ' + success.foodName);
        this.getFood();
        this.createForm();
        this.allAllergens = [];
      },
      error => {
        this.toast.error(error);
      });
  }
  createForm() {
    this.foodForm = this.fb.group({
      allergenControl : this.allergenControl,
      descriptionControl : ['', Validators.required],
      nameControl : ['', Validators.required],
      typeControl : [ '' , Validators.required],
      displayControl : ['']
    });
  }
  removeAllergen(name, id) {
    this.allAllergens.splice(this.allAllergens.indexOf(name), 1);
    this.allergensId.splice(this.allergensId.indexOf(id), 1);
  }

}
