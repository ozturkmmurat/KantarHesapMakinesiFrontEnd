import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    //Service Start
    private authService: AuthService,
    private toastrService: ToastrService,
    private errorService : ErrorService,
    //Service End

    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message)
        })
    }else{
      this.toastrService.error("Formu eksiksiz doldurun.")
    }
  }

}
