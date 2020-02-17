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
import {Status} from '../../class/wine/status';
import {StatusService} from '../../service/wine/status.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WineService} from '../../service/wine/wine.service';
import {ModalService} from '../../component/test/modal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {



  tab = ['toto', 'titi', 'tata', 'tutu'];
  constructor(   ) {}
  ngOnInit() {
    this.tab.splice(1, 1);
    console.log('tab = ', this.tab);
   }

}
