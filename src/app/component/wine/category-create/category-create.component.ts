import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../service/wine/category.service';
import {Category} from '../../../class/wine/category';
import {DialogComponent} from '../../../dialog/dialog.component';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {


  @Input() listToAdd: Category[];
  @Input() dialog;

  categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    // this.categoryForm = this.fb.group( {
    //   categoryName: ['', Validators.required],
    // });
  }
  // save() {
  //   const val = this.categoryForm.value;
  //   this.categoryService.createCategory(val.categoryName)
  //     .subscribe( (category: Category) => {
  //       if (this.listToAdd) {
  //         this.listToAdd.push(category);
  //       }
  //       if (this.dialog) {
  //         this.dialog.close();
  //       }
  //     });
  //   this.categoryForm.reset();
  // }
}
