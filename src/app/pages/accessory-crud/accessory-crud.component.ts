import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { ModalService } from 'src/app/services/modalService/modal.service';

@Component({
  selector: 'app-accessory-crud',
  templateUrl: './accessory-crud.component.html',
  styleUrls: ['./accessory-crud.component.scss']
})
export class AccessoryCrudComponent implements OnInit {


  accessoryList : Accessory[] = [];
  _addAccessoryForm : FormGroup;
  _updateAccessoryForm : FormGroup;

  filterText:any
  constructor(
    private accessoryService : AccessoryService,
    private modalService : ModalService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllAccessory()
    this.addAccessoryForm()
    this.updateAccessoryForm()
  }

  getAllAccessory(){
    this.accessoryService.getAllAccessory().subscribe(response => {
      this.accessoryList = response.data
    })
  }

  openLg(content:any) : void{
    this.modalService.openLg(content);
  }

  writeAccessory(accessory:Accessory){
    this._updateAccessoryForm.patchValue({
      id:accessory.id, accessoryName:accessory.accessoryName, accessoryEuroPrice:accessory.accessoryEuroPrice
    })
  }

  addAccessoryForm(){
    this._addAccessoryForm = this.formBuilder.group({
      accessoryName:["", Validators.required],
      accessoryEuroPrice:["",Validators.required],
    })
  }

  updateAccessoryForm(){
    this._updateAccessoryForm = this.formBuilder.group({
      id:["", Validators.required],
      accessoryName:["",Validators.required],
      accessoryEuroPrice:["",Validators.required]
    })
  }

  addAccessory(){
    if(this._addAccessoryForm.valid){
      let accessoryModel = Object.assign({}, this._addAccessoryForm.value)
      this.accessoryService.add(accessoryModel).pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.error.Errors.length >0){
            for(let i = 0; i < err.error.Errors.length; i++){
              this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
        }
        return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllAccessory()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateAccessory(){
    if (this._updateAccessoryForm.valid) {
      let accessoryModel = Object.assign({}, this._updateAccessoryForm.value)
      this.accessoryService.update(accessoryModel).pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.error.Errors.length >0){
            for(let i = 0; i < err.error.Errors.length; i++){
              this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
          }
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message,"Başarılı")
          this.getAllAccessory()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun", "Hata")
    }
  }

  deleteAccessory(accessory:Accessory){
    this.accessoryService.delete(accessory).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.error.Errors.length >0){
          for(let i = 0; i < err.error.Errors.length; i++){
            this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
          }
        }
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllAccessory()
      })
  }

}
