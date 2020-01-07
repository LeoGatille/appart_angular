import { Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';
import {Globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public currentTitle: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}
  public makeTitle() {
    this.router.events.pipe(
      filter( (event) => event instanceof NavigationEnd ),
      map( () => {
        let route = this.activatedRoute;
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter( (route) => route.outlet === 'primary' ),
      map( (route) => route.snapshot),
      map( (snapshot) => {
        if ( snapshot.data.title ) {
          if (snapshot.paramMap.get('id') !== null && snapshot.paramMap.get('verb') !== null) {
            return snapshot.data.title +
              Globals.APP_TAB_SEPARATOR +
              snapshot.paramMap.get('verb') +
              Globals.APP_TAB_SEPARATOR +
              snapshot.paramMap.get('id');
          }
          if (snapshot.paramMap.get('id') !== null) {
            return snapshot.data.title +
              Globals.APP_TAB_SEPARATOR +
              snapshot.paramMap.get('id');
          }
          return snapshot.data.title;
        } else {
          return this.router.url.split('/').reduce( (acc, frag) => {
            if ( acc && frag ) {
              acc += Globals.APP_TAB_SEPARATOR;
              return acc + frag;
            }
            return frag;
          });
        }
      })
    ).subscribe( (pathString) => {
      this.title.setTitle(`${pathString} ${Globals.APP_TAB_SEPARATOR} ${Globals.APP_TAB_TITLE}`);
      this.currentTitle = pathString;
    });
  }
}
