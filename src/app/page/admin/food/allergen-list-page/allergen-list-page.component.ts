import { Component, OnInit } from '@angular/core';
import {Allergen} from '../../../../class/food/allergen';
import {AllergenService} from '../../../../service/food/allergen.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../../../../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-allergen-list-page',
  templateUrl: './allergen-list-page.component.html',
  styleUrls: ['./allergen-list-page.component.scss']
})
export class AllergenListPageComponent implements OnInit {

  allAllergens: any[];
  allergenPromise: any;
  loading = true;
  constructor(
    private allergenService: AllergenService,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }
  ngOnInit() {
    this.getAllergens();
  }
  getAllergens(force = false) {
    console.log('titi');
    this.allergenPromise = (bool) => this.allergenService.getAllAllergens((force));
    this.allergenPromise().then((data: any[]) => {
      this.allAllergens = data;
      this.loading = false;
    });
  }
  createAllergens($event) {
    console.log('event', $event);
    this.allergenService.create($event.nameControl)
      .subscribe((allergen: Allergen) => {
        this.toast.success('Ajout de ' + allergen.allergenName);
        this.allAllergens.push(allergen);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  childAskFor(request: any) {
    switch(request.action) {
      case('refresh') :
        this.toast.success(request.message);
        this.getAllergens(true);
      break;
      case('error') :
        this.toast.warning(request.message);
      break;
      default :
        this.toast.warning('Une erreur est survenue');
      break;
    }
  }
}
