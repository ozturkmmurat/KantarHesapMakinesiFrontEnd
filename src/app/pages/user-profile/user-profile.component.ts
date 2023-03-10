import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { write } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    //Service Start
    private userService : UserService,
    private toastrService : ToastrService,
    private errorService : ErrorService,
    //Service End
    private formBuilder : FormBuilder,
  ) {
   }

  user$: Observable<User>
  _userForm : FormGroup
  

  ngOnInit() {
    this.loadingUser()
    this.updateUserForm()
  }

  loadingUser(){
    this.user$ = this.userService.currentUser$;
    this.user$.subscribe(response => {
    }).unsubscribe()
  }


  updateUserForm(){
    this.user$
      .subscribe(response => {
        this.loadingUser()
        console.log("Form data", response)
        this._userForm = this.formBuilder.group({
            userId : [Number(response.id),Validators.required],
            firstName : [response.firstName, Validators.required],
            lastName : [response.lastName, Validators.required],
            oldPassword : [],
            newPassword : [],
            againNewPassword : [],
            email : [response.email, Validators.required]
        })
      })
  }

  updateUser(){
    if(this._userForm.valid){
      let userModel = Object.assign({}, this._userForm.value)
      this.userService.update(userModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
        return of()
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.loadingUser()
          this.userService.setCurrentUser()
        })
    }
  }

}
