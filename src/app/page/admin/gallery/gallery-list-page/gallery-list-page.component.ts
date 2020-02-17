import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../../../service/gallery/image.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../../../globals';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.scss']
})
export class GalleryListPageComponent implements OnInit {

  imageForm: FormGroup;
  fileToUpload: File = null;
  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.imageForm = this.fb.group({
      fileControl: [null],
      altControl: ['']
    });
  }

  onFileSelect(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('file = ', file);
    this.imageForm.patchValue({
      fileControl: file
    });
    this.imageForm.get('fileControl').updateValueAndValidity();
  }

  handleFileInput(files: FileList) {
    console.log('$event files = ', files);
    this.fileToUpload = files.item(0);
  }

  save() {


    if (this.fileToUpload) {
      console.log('fileToUpload = ', this.fileToUpload.type);
      const val = this.imageForm.value;
      const input = new FormData();
      input.append('image', this.fileToUpload);
      input.append('alternative', val.altControl);
      this.imageService.createImage(input)
        .subscribe(() => {

        });
    }


    // console.log('val', this.imageForm.value);
    // const formData = new FormData();
    // formData.append('file', this.imageForm.get('fileControl').value);
    // this.imageService.createImage(formData)
    //   .subscribe(() => {
    //     console.log('FormData = ', formData.get('file'));
    //   });

    // const formModel = this.prepareSave();
    // this.imageService.createImage(formModel)
    //   .subscribe(() => {
    //     console.log('formModel = ', formModel);
    //   });
    //  this.imageService.createImage(val.image)
    //    .subscribe();
  }
  private prepareSave(): any {
    const input = new FormData();
    input.append('name', this.imageForm.get('alt').value);
    input.append('avatar', this.imageForm.get('file').value);
    return input;
  }
}
