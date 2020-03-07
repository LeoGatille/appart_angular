import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ImageService} from '../../service/gallery/image.service';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit {

  imageForm: FormGroup;
  allImage: any[] = [];
  objectTab: any[] = [];
  fileToUpload: File = null;
  loading = true;
  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    this.getAllImages();
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
    tab.forEach(image => {
      this.objectTab.push({path: image.imgPath, alt: image.alternative});
    });
    this.loading = false;
  }
}
