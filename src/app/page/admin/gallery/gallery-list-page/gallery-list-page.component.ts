import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../../../service/gallery/image.service';

@Component({
  selector: 'app-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.css']
})
export class GalleryListPageComponent implements OnInit {

  allImages: string[];
  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.imageService.getAllImages()
      .subscribe((allurl: string[]) => {
        this.allImages = allurl;
      });
  }

}
