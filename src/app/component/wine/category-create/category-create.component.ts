import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../service/wine/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group( {
      categoryName: ['', Validators.required],
      categoryOrder  : ['', Validators.required]
    });
  }
  save() {
    const val = this.categoryForm.value;
    this.categoryService.createCategory(val.categoryName, val.categoryOrder)
      .subscribe();
    this.categoryForm.reset();
  }
}
