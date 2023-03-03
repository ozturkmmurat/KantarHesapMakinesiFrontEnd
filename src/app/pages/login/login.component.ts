import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForUpdateDto } from 'src/app/models/Dtos/userForUpdateDto';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  user: UserForUpdateDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private toastrService: ToastrService, 
    private localStorageService: LocalStorageService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.createLoginForm()
  }
  ngOnDestroy() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(
        (response) => {
          if(response.success){

            this.localStorageService.setToken(response.data.token)
            this.localStorageService.setTokenExpiration(response.data.expiration)
            this.localStorageService.setRefreshToken(response.data.refreshToken)
            this.userService.setCurrentUser()
            this.router.navigate([""]);
          }
        },errorResponse => {
        }
      )
    }
  }

}
