import {Component, Input, OnInit} from '@angular/core';
import {Image} from '../../../class/gallery/image';
import {ImageService} from '../../../service/gallery/image.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: any;
  @Input() SelectedImages: Image[];
  loading = false;
  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {
  }

}
