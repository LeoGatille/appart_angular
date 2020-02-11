import { Component, OnInit } from '@angular/core';
import {Allergen} from '../../../../class/food/allergen';
import {AllergenService} from '../../../../service/food/allergen.service';

@Component({
  selector: 'app-allergen-list-page',
  templateUrl: './allergen-list-page.component.html',
  styleUrls: ['./allergen-list-page.component.css']
})
export class AllergenListPageComponent implements OnInit {

  allAllergens: any[];
  allergenPromise: any;
  loading = true;
  constructor(
    private allergenService: AllergenService
  ) { }

  ngOnInit() {
    this.getAllergens();
    this.loading = false;
    // this.allergenService.getAllAllergens()
    // .subscribe((allergens: Allergen[]) => {
    //   this.allAllergens = allergens;
    // });
    // this.loading = false;
  }
  getAllergens(force = false) {
    console.log('titi');
    this.allergenPromise = (bool) => this.allergenService.getAllAllergens((force));
    this.allergenPromise().then((data: any[]) => {
      this.allAllergens = data;
      console.log('toto');
    });
  }
  createAllergen($event) {
    console.log('event', $event);
    this.allergenService.create($event.nameControl)
      .subscribe((allergen: Allergen) => {
        this.allAllergens.push(allergen);
      });
  }
  deleteAllergen(id) {
    this.allergenService.deleteAllergen(id)
      .subscribe(() => {
        this.allergenPromise = (bool) => this.allergenService.getAllAllergens((true));
        this.allergenPromise().then((data: any[]) => {
          this.allAllergens = data;
          console.log('toto');
        });
      });
  }

}
