import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { UserForUpdateDto } from 'src/app/models/Dtos/userForUpdateDto';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
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
    //Service Start
    private authService: AuthService, 
    private errorService : ErrorService,
    private toastrService: ToastrService, 
    private localStorageService: LocalStorageService,
    private userService:UserService
    //Service End
  ) {}

  ngOnInit() {
    this.createLoginForm()
  }
  ngOnDestroy() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: []
    })
  }


  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
        return of();
        })) 
        .subscribe(response => {
          this.localStorageService.setToken(response.data.token)
            this.localStorageService.setTokenExpiration(response.data.expiration)
            this.localStorageService.setRefreshToken(response.data.refreshToken)
            this.userService.setCurrentUser()
            this.router.navigate(["models"]);
        })
    }
  }

}
