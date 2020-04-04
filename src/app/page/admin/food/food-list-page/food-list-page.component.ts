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
import {log} from 'util';

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
  allergenNames: string[] = [];
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

    this.getFood();

    this.action = 'list';
    this.allAllergens = [];
    this.food = new Food();

    this.allergenPromise = (bool) => this.allergenService.getAllAllergens(bool);
    this.allergenControl = new FormControl(this.stockAllergen);
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
  getAllergenId($event: Allergen) {
    if (!$event) {
      return;
    }
    if (typeof $event.id === 'number') {
      if (!this.allergensId.find(id => id === $event.id)) {
        console.log('toto = ',this.allergensId.find(id => id === $event.id));
        
      this.allergensId.push($event.id);
      this.allergenNames.push($event.allergenName);
      this.allAllergens.push($event);
      } else {
        this.toast.error('élément déja assigné');
      }

    }
  }

  toglle(event) {
    this.foodForm.patchValue({
      displayControl: event.checked
    });
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
        this.allergenNames = [];
        this.allAllergens = [];
      },
      error => {
        this.toast.error(error.error);
        console.log(error);
      });
  }
  createForm() {
    this.foodForm = this.fb.group({
      allergenControl : this.allergenControl,
      descriptionControl : [''],
      nameControl : ['', Validators.required],
      typeControl : [ '' , Validators.required],
      displayControl : ['']
    });
  }
  removeAllergen(name) {
    console.log('allergen = ', this.allergenNames.indexOf(name));
    console.log('allergenID = ', this.allergensId);
   // console.log('dans le tab =', this.allAllergens.indexOf(name), 'le tab = ', this.allAllergens);
    this.allergensId.splice(this.allergenNames.indexOf(name), 1);
    this.allergenNames.splice(this.allergenNames.indexOf(name), 1);

  }

}
