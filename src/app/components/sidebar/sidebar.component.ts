import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Profilim',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/userList', title: 'Kullanıcılar',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/heightWeight', title: 'Ölçü',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/products', title: 'Ürünler',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/models', title: 'Modeller',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/accessory', title: 'Aksesuarlar',  icon:'ni-bullet-list-67 text-red', class: '' },,
    { path: '/electronic', title: 'Elektronik',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/installationCost', title: 'Kurulum Ücretleri',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/costVariable', title: 'Maliyet Değişkenleri',  icon:'ni-circle-08 text-pink', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
