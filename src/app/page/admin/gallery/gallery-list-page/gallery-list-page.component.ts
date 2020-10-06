import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../../service/gallery/image.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../../../../globals';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../../../../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.scss']
})
export class GalleryListPageComponent implements OnInit {

  imageForm: FormGroup;
  allImage: any[] = [];
  objectTab: any[] = [];
  fileToUpload: File = null;
  loading = true;
  valid = false;
  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllImages();
    this.imageForm = this.fb.group({
      fileControl: [null, Validators.required],
      altControl: ['']
    });
  }
  getAllImages() {
    this.imageService.getAllImages()
      .subscribe((res: any) => {
        console.log('res = ', res);
        this.allImage = res;
        this.getAllPath(res);
      });
  }
  getAllPath(tab) {
    this.objectTab = [];
    tab.forEach(image => {
      this.objectTab.push({ path: image.imgPath, alt: image.alternative });
    });
    this.loading = false;
  }

  deleteImages() {
    const supprElements = document.getElementsByClassName('suppr');
    const supprImages: any[] = [];
    const supprNames: string[] = [];
    for (let i = 0; i < supprElements.length; i++) {
      const myIndex: any = supprElements[i].getAttribute('index');
      supprImages.push(this.allImage[myIndex]);
      console.log('allimage index = ', this.allImage[myIndex]);
      supprNames.push(this.allImage[myIndex].alternative);
    }
    this.OpenSuppresionModal(supprNames, supprImages);
  }
  OpenSuppresionModal(tabNames, tabSuppr) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Suppression',
      manySuppr: tabNames,
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log('tabSuppr = ', tabNames);
          this.launchSuppression(tabSuppr);
        }
      }
    );
  }

  launchSuppression(tab: any[]) {
    tab.forEach((image: any) => {
      this.imageService.deleteImage(image.id)
        .subscribe(res => {
          this.toast.success('Suppression effectué');
          this.getAllImages();
        });
    });
  }

  onFileSelect(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({
      fileControl: file
    });
    this.imageForm.get('fileControl').updateValueAndValidity();
  }

  handleFileInput(files: FileList) {
    this.valid = true;

    this.fileToUpload = files.item(0);
  }

  save() {
    if (this.fileToUpload) {
      const val = this.imageForm.value;
      const input = new FormData();
      input.append('image', this.fileToUpload);
      input.append('alternative', val.altControl);
      this.imageService.createImage(input)
        .subscribe((res) => {
          this.toast.success('Ajout de l\'image');
          this.getAllImages();
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
