import { Wine } from './../../../class/wine/wine';
import { WineGetterInterface } from './../../../class/wineGetterInterface';
import { CrudInterface } from './../../../class/curdInterface';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss']
})
export class ActionTableComponent implements OnInit {

  @Input() itemsList: CrudInterface[];
  @Output() parentAction = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log('itemlist = ', this.itemsList);
    
  }
  getWinesTooltip(index: number){
    const wineList = this.itemsList[index].getWines()
    const wineNameList: string[] = [];
    wineList.forEach((wine: Wine, i) => {
      if( (wineNameList.length > 1)) {        
        wineNameList.push(', ');
      }
      wineNameList.push(wine.wineName);
    });    
    return wineNameList.join('');
  }

  edit(toEdit: CrudInterface) {
    toEdit.initEdition()
      .then((promise) => {
        Promise.resolve(promise)
          .then((message: string) => {
            if(message === null || message === undefined || message === '') {
              return;
            }
            this.parentAction.emit({action: 'refresh', message: message})
          })
          .catch((message: string) => {
            this.parentAction.emit({action: 'error', message: message})
          })
      }).catch((error) => {
        this.parentAction.emit({action: 'error', message: error})
      })
  }
  delete(toDelete: CrudInterface) {
    const promiseOfDeletion = toDelete.askForDeletion();
    promiseOfDeletion.then((promise) => {
      const promiseOfmessage = Promise.resolve(promise);
      return promiseOfmessage.then((message: string) => {
        if(message) {
          this.parentAction.emit({action: 'refresh', message: message})
        }
      }).catch((message: string) => {
        this.parentAction.emit({action: 'error', message: message})
      });
    }).catch((message: string) => {
      this.parentAction.emit({action: 'error', message: message})
    });
  }
}
