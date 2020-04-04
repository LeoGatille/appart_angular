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
        this.toast.success('Ajout de ' + allergen.allergenName);
        this.allAllergens.push(allergen);
      },
      error => {
        this.toast.error(error.error)
      });
  }
  deleteAllergen(id) {
    this.allergenService.deleteAllergen(id)
      .subscribe(() => {
        this.toast.success('Suppression effectuée');
        this.allergenPromise = (bool) => this.allergenService.getAllAllergens((true));
        this.allergenPromise().then((data: any[]) => {
          this.allAllergens = data;
          console.log('toto');
        });
      });
  }

  delete(allergen: Allergen) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      suppr: allergen.allergenName,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(
      data =>  {
        console.log('data === ', data);
        if (data) {
          this.allergenService.deleteAllergen(allergen.id)
            .subscribe(() => {
              this.toast.success('Supression effectuée');
              this.allergenPromise = (bool) => this.allergenService.getAllAllergens((true));
              this.allergenPromise().then((data: any[]) => {
                this.allAllergens = data;
                console.log('toto');
              });
            });
        }
      }
    );
  }

}
