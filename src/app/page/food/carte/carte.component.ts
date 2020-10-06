import { Allergen } from './../../../class/food/allergen';
import { AuthService } from './../../../service/auth.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AllergenService } from './../../../service/food/allergen.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../service/food/food.service';
import { Food } from '../../../class/food/food';
import { TypeService } from '../../../service/food/type.service';
import { Type } from '../../../class/food/type';
import { FormulaService } from '../../../service/food/formula.service';
import { Formula } from '../../../class/formula';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {
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
    private toast: ToastrService,
    private auth: AuthService,
    private formulaService: FormulaService,
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

  isConnected() {
    return this.auth.isConnected();
  }

  getFood() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
        this.getFormulas()
      });
  }
  allFormulas: Formula[] = [];
  formatedFormulas = [];
  getFormulas() {
    this.formulaService.getAllFormulas()
      .subscribe((formulas: Formula[]) => {
        this.allFormulas = formulas;
        this.realPrice(this.allFormulas);
        this.loading = false;
      });
  }
  realPrice(tab: Formula[]) {
    this.formatedFormulas = [];
    this.allFormulas.forEach((formula: Formula) => {
      let newFormula: any;
      newFormula = formula;
      newFormula.realPrice = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(formula.formulaPrice / 100));
      this.formatedFormulas.push(newFormula);
    });
  }
  sortFoods(foodTab: Food[]): Food[] {
    return foodTab.sort((a: Food, b: Food) => {
      let textA = a.foodName.toUpperCase();
      let textB = b.foodName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }

  getAllergenId($event: Allergen) {
    if (!$event) {
      return;
    }
    if (typeof $event.id === 'number') {
      if (!this.allergensId.find(id => id === $event.id)) {
        console.log('toto = ', this.allergensId.find(id => id === $event.id));

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
      this.resetForm();
      this.allergenNames = [];
      this.allAllergens = [];
    },
      error => {
        this.toast.error(error.error);
        console.log(error);
      });
  }
  resetForm() {
    this.foodForm.reset();
    this.allergensId = [];
    this.allergenNames = [];
  }
  createForm() {
    this.foodForm = this.fb.group({
      allergenControl: this.allergenControl,
      descriptionControl: [''],
      nameControl: ['', Validators.required],
      typeControl: ['', Validators.required],
      displayControl: ['']
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
