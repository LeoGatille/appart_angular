import { Component, OnInit } from '@angular/core';
import {Allergen} from '../../../../class/food/allergen';
import {AllergenService} from '../../../../service/food/allergen.service';

@Component({
  selector: 'app-allergen-list-page',
  templateUrl: './allergen-list-page.component.html',
  styleUrls: ['./allergen-list-page.component.css']
})
export class AllergenListPageComponent implements OnInit {

  allAllergens: Allergen[];
  loading = true;
  constructor(
    private allergenService: AllergenService
  ) { }

  ngOnInit() {
    this.allergenService.getAllAllergens()
    .subscribe((allergens: Allergen[]) => {
      this.allAllergens = allergens;
    });
    this.loading = false;
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
      .subscribe();
  }

}
