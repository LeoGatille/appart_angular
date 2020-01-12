import { Pipe, PipeTransform } from '@angular/core';
import {Label} from '../../class/wine/label';
import {LabelService} from '../../service/wine/label.service';

@Pipe({
  name: 'controlLabel'
})
export class ControlLabelPipe implements PipeTransform {
 private labelService: LabelService;
  transform(value: Label, ...args: any[]): any {


  }

}
