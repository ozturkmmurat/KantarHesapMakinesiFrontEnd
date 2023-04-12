import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { UserDto } from 'src/app/models/Dtos/userDto';
import { OperationClaim } from 'src/app/models/operationClaim';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { OperationClaimService } from 'src/app/services/operationClaimService/operation-claim.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //Model Start
  userDtoList : UserDto[] = [];
  operationClaimList : OperationClaim[] = [];
  //Model End

  //Form Start
  _updateUserForm : FormGroup;
  //Form End

  filterText:any;

  constructor(
    //Service Start
    private modalService : ModalService,
    private userService : UserService,
    private operationClaimService : OperationClaimService,
    private toastrService : ToastrService,
    private errorService : ErrorService,
    //Service End
    
    //Form Start
    private formBuilder : FormBuilder,
    //Form End
  ) { }


  ngOnInit(): void {
    this.getAllUser()
    this.getAllOperationClaim()
    this.updateUserForm()
  }

  openLg(content : any){
    this.modalService.openLg(content)
  }

  updateUserForm(){
    this._updateUserForm = this.formBuilder.group({
      userId:["",Validators.required],
      userOperationClaimId:[Validators.required],
      operationClaimId:[Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["", Validators.required],
      status:[Validators.required]
    })
  }

  getAllUser(){
    this.userService.getAllUserDto().subscribe(response => {
      this.userDtoList = response.data
    })
  }

  getAllOperationClaim(){
    this.operationClaimService.getAllOperationClaim().subscribe(response => {
      this.operationClaimList = response.data
    })
  }

  writeUserForm(userDto : UserDto){
    this._updateUserForm.patchValue({
      userId:userDto.userId, userOperationClaimId : userDto.userOperationClaimId, operationClaimId:userDto.operationClaimId,
      firstName:userDto.firstName, lastName:userDto.lastName, email:userDto.email, status : userDto.status
    })
  }

  updateUser(){
    if (this._updateUserForm.valid) {
      let userModel = Object.assign({}, this._updateUserForm.value)
      this.userService.updateUser(userModel).pipe(
        catchError((err:HttpErrorResponse) => {
         this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllUser();
        })
    }
  }


}
