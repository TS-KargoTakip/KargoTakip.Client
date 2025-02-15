import { Injectable, signal } from '@angular/core';
import { BreadCrumbModel } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  data = signal<BreadCrumbModel[]>([]);

  reset(){
    this.data.set([
      {
        name: "Ana Sayfa",
        routerLink: "/",
        icon: "home"
      }
    ])
  }

  add(name: string, routerLink: string, icon:string){
    this.data.update((prev) => [...prev, {name: name, routerLink: routerLink, icon: icon}]);
  }
}
