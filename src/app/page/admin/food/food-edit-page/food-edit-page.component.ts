import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Food} from '../../../../class/food/food';
import {Allergen} from '../../../../class/food/allergen';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodService} from '../../../../service/food/food.service';
import {ActivatedRoute} from '@angular/router';
import {AllergenService} from '../../../../service/food/allergen.service';
import {TypeService} from '../../../../service/food/type.service';
import {Type} from '../../../../class/food/type';
import {log} from 'util';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-edit-page',
  templateUrl: './food-edit-page.component.html',
  styleUrls: ['./food-edit-page.component.scss']
})
export class FoodEditPageComponent implements OnInit {

  display: number;
  id: number;
  // food: Food;
 // allAllergens: Allergen[];
  allTypes: Type[];
  loading = true;
  allergenControl: FormControl;
  foodForm: FormGroup;
  allergensId: number[] = [];
  selectedAllergens: Allergen[] = [];
  type: Type;
  typeControl: FormControl;
  allergenPromise: any;
  title = 'Allergen';
  allergensNames: string[] = [];
  theType: Type;
  @Input() food: Food;
  @Output() close = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private allergenService: AllergenService,
    private typeService: TypeService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
  ) {

  }

  ngOnInit() {
    console.log('FOOD = ', this.food);
    this.launchProcesses();
    // this.allergensId = [];
    // this.activatedRoute.params
    //   .subscribe((params) => {
    //     this.id = params.id;
    //     return this.launchProcesses();
    //   });

  }
  launchProcesses() {
    this.typeService.getAllType()
      .subscribe((types: Type[]) => {
        this.allTypes = types;
      });
    this.allergenPromise = (bool) => this.allergenService.getAllAllergens(bool);
    this.allergenControl = new FormControl('', Validators.required);
    this.selectedAllergens = this.food.allergen;
    this.createForm();
    this.getAllergenId('init');
    // this.foodService.getOneFood(this.id)
    //    .subscribe((food: Food) => {
    //      this.food = food;
    //      this.selectedAllergens = this.food.allergen;
    //
    //      this.loading = false;
    //    });
    this.loading = false;
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
    if ($event === 'init') {
      this.selectedAllergens.forEach(allergen => {
        this.allergensNames.push(allergen.allergenName);
        this.allergensId.push(allergen.id);
      });
    }
    if (typeof $event.id === 'number') {
      this.allergensId.push($event.id);
      this.allergensNames.push($event.allergenName);
      this.selectedAllergens.push($event);
      console.log('allergensId = ', this.allergensId);
    }
  }

  save() {
    if (!this.foodForm.value.typeControl) {
      this.toast.error('Présiser le type');
    }
    const val = this.foodForm.value;
    console.log('val = ', val);
    this.foodService.editFood(
      this.food.id, val.nameControl,
      val.descriptionControl,
      this.getBooelan(val.displayControl),
      val.typeControl.id,
      this.allergensId
    ).subscribe((res: Food) => {
      this.toast.success('Modification de ' + res.foodName);
      this.close.emit();
      },
      (error) => {
        this.toast.error(error);
      }
      );
  }
  toglle(event) {
    this.foodForm.patchValue({
      displayControl: event.checked
    });
    console.log(event);
    console.log(this.foodForm.value.displayControl);
  }

  getBooelan(val) {
    console.log(val);
    let checked = 2;
    if (val === true) {
      checked = 1;
    }
    return checked;
  }

  createForm() {
    this.foodForm = this.fb.group({
      allergenControl : this.allergenControl,
      descriptionControl : [this.food.foodDescription],
      nameControl : [this.food.foodName, Validators.required],
      typeControl : [ this.food.type , Validators.required],
      displayControl : [this.food.display]
    });
  }
  removeAllergen(name, id) {
    this.allergensId.splice(this.allergensNames.indexOf(name), 1);
    this.allergensNames.splice(this.allergensNames.indexOf(name), 1);
    console.log('selected = ', this.selectedAllergens, ' allergensId = ', this.allergensId );
  }
}
