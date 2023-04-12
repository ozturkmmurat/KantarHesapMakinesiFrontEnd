import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private toastrService : ToastrService
    ) {
    this.location = location;
  }

  user$: Observable<User>

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.loadingUser()
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logOut() {
    this.authService.logOut()
    this.userService._currentUser$.next(null);
    this.toastrService.info("Hesaptan çıkış yapılmıştır.")
  }

  loadingUser(){
    this.user$ = this.userService.currentUser$;
    this.user$.subscribe(response => {
    }).unsubscribe()
  }

}
