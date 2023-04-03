import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastrService: ToastrService
  ) { }

  checkError(err: HttpErrorResponse) {
    console.log(err)
    if (err.error != null && err.error != undefined && !err.error.Errors) {
      console.log
      this.toastrService.error(err.error.message, "Hata")
    }
    else if (err.error.Errors.length > 0) {
      for (let i = 0; i < err.error.Errors.length; i++) {
        this.toastrService.error(err.error.Errors[i].ErrorMessage, "Doğrulama hatası")
      }
    }
    else if (err.message  != null || err.message != undefined){
      this.toastrService.error(err.error.message)
    }
  }
}
