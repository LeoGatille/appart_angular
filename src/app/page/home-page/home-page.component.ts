import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../service/wine/category.service';
import {Category} from '../../class/wine/category';
import {map, startWith} from 'rxjs/operators';
import {ColorService} from '../../service/wine/color.service';
import {Color} from '../../class/wine/color';
import {Wine} from '../../class/wine/wine';
import {DesignationService} from '../../service/wine/designation.service';
import {LabelService} from '../../service/wine/label.service';
import {VintageService} from '../../service/wine/vintage.service';
import {Designation} from '../../class/wine/designation';
import {Label} from '../../class/wine/label';
import {Vintage} from '../../class/wine/vintage';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  vin: Wine;
  loading = true;
  colors: any[];
  categories: any[];
  designations: any[];
  labels: any[];
  vintages: any[];

  constructor( private colorService: ColorService,
               private categoryService: CategoryService,
               private designationService: DesignationService,
               private labelService: LabelService,
               private vintageService: VintageService
  ) {
    this.vin = new Wine();
    const catP = this.categoryService.getAllCategories().toPromise();
    const colorP = this.colorService.getAllColors().toPromise();
    const designationP = this.designationService.getAllDesignations().toPromise();
    const labelP = this.labelService.getAllLabels().toPromise();
    const vintageP = this.vintageService.getAllVintages().toPromise();
    Promise.all([catP, colorP, designationP, labelP, vintageP]).then((data: any[]) => {
      this.loading = false;
      const categories = data[0];
      const colors = data[1];
      const designations = data[2];
      const labels = data[3];
      const vintages = data[4];
      this.vin.category = categories[0];
      this.vin.color = colors[0];
      this.vin.designation = designations[0];
      this.vin.label = labels[0];
      this.vin.vintage = vintages[0];
      this.colors = colors;
      this.categories = categories;
      this.designations = designations;
      this.labels = labels;
      this.vintages = vintages;
    });
  }

  displayFn(color: Color): string {
    return color ? color.colorName : '';
  }
  displayFnCategory(category: Category): string {
    return category ? category.categoryName : '';
  }
  displayFnDesignation(designation: Designation): string {
    return designation ? designation.designationName : '';
  }
  displayFnLabel(label: Label): string {
    return label ? label.labelName : '';
  }
  displayFnVintage(vintage: Vintage): any {
    return vintage ? vintage.vintageYear : '';
  }

  callBackFilter(filterValue) {
    return (color) => {
      return color.colorName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterCat(filterValue) {
    return (category) => {
      return category.categoryName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterDesignation(filterValue) {
    return (designation) => {
      return designation.designationName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterLabel(filterValue) {
    return (label) => {
      return label.labelName.toLowerCase().includes(filterValue);
    };
  }
  callBackFilterVintage(filterValue) {
    return (vintage) => {
      return vintage.vintageYear.includes(filterValue);
    };
  }


  ngOnInit() {}

  ngOnDestroy() {}
}
