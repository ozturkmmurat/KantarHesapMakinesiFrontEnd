import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private userService : UserService,
    private localStorageService : LocalStorageService,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.loadUser()
  }

  loadUser(){
    if(this.localStorageService.getToken != null){
    this.userService.setCurrentUser()
  }
  else{
    this.authService.logOut()
  }

  }
}
