import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles:string[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Profilim',  icon:'ni-single-02 text-yellow', class: '', roles: ['user', 'admin', 'official']},
    { path: '/userList', title: 'Kullanıcılar',  icon:'ni-single-02 text-yellow', class: '',  roles: ['admin']},
    { path: '/heightWeight', title: 'Ölçü',  icon:'ni-single-02 text-yellow', class: '' ,  roles: ['admin']},
    { path: '/products', title: 'Ürünler',  icon:'ni-bullet-list-67 text-red', class: '' ,  roles: ['admin']},
    { path: '/models', title: 'Modeller',  icon:'ni-bullet-list-67 text-red', class: '' ,  roles: ['admin']},
    { path: '/accessory', title: 'Aksesuarlar',  icon:'ni-bullet-list-67 text-red', class: '' ,  roles: ['admin'] },,
    { path: '/electronic', title: 'Elektronik',  icon:'ni-bullet-list-67 text-red', class: '' ,  roles: ['admin']},
    { path: '/installationCost', title: 'Kurulum Ücretleri',  icon:'ni-bullet-list-67 text-red', class: '' ,  roles: ['admin']},
    { path: '/costVariable', title: 'Maliyet Değişkenleri',  icon:'ni-circle-08 text-pink', class: '' ,  roles: ['admin']},
    { path: '/calculateOffer', title: 'Teklif Hesapla',  icon:'ni-circle-08 text-pink', class: '' , roles: ['user', 'admin', 'official']}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  userRole : string
  constructor(private router: Router, private localStorageService : LocalStorageService, private authService : AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userRole = this.getRole()
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  getRole(){
    return this.authService.decodeToken(this.localStorageService.getToken())['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }

  hasPermission(requiredRoles: string[]): boolean {
    return requiredRoles.includes(this.userRole);
  }
}
