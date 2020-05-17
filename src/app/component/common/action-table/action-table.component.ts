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

  async ngOnInit() {
    this.sortList();
  }
  sortList() {
    this.itemsList.sort(function(a, b) {
      if(isNaN(parseInt(a.getName(), 10))) {
        let textA = a.getName().toUpperCase();
        let textB = b.getName().toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      } else {
        let numA = parseInt(a.getName(), 10);
        let numB = parseInt(b.getName(), 10);
        return numA - numB;
      }
  });
  }
  getWinesTooltip(index: number){
    const linkedList = this.itemsList[index].wines ? this.itemsList[index].wines : this.itemsList[index].foods;
    const linkedNameList: string[] = [];
    linkedList.forEach((link: any, i) => {
      if( (linkedNameList.length > 1)) {        
        linkedNameList.push(', ');
      }
      linkedNameList.push(link.wineName ? link.wineName : link.foodName);
    });    
    return linkedNameList.join('');
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
          this.parentAction.emit({action: 'refresh', message: message});
        }
      }).catch((message: string) => {
        this.parentAction.emit({action: 'error', message: message})
      });
    }).catch((message: string) => {
      this.parentAction.emit({action: 'error', message: message})
    });
  }
}
