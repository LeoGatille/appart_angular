import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../../../service/gallery/image.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../../../globals';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.css']
})
export class GalleryListPageComponent implements OnInit {

  taskForm: FormGroup;
  fileToUpload: File = null;
  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      alt: [null, Validators.required],
    });
  }

  // createTask() {
  //   const val = this.taskForm.value;
  //   });
  //   this.loading = true;
  //   if (this.fileToUpload) {
  //     this.imgServ.postFile(this.fileToUpload)
  //       .subscribe((image: Image) => {
  //         this.launchTaskCreation(val.name, val.priority, categories, image.id);
  //       });
  //     return ;
  //   }
  //   this.launchTaskCreation(val.name, val.priority, categories);
  // }
  // private launchTaskCreation(image) {
  //   this.imageService.(name, priority, categories, image)
  //     .subscribe((data) => {
  //       this.loading = false;
  //       this.router.navigate(['/task']);
  //     });
  // }
}
