import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ModalService } from 'src/app/services/modalService/modal.service';

@Component({
  selector: 'app-electronic-crud',
  templateUrl: './electronic-crud.component.html',
  styleUrls: ['./electronic-crud.component.scss']
})
export class ElectronicCrudComponent implements OnInit {

  electronicList : Electronic[] = [];
  _addElectronicForm : FormGroup;
  _updateElectronicForm : FormGroup
  p : any

  constructor(
    private electronicService: ElectronicService,
    private modalService : ModalService,
    private toastrService: ToastrService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllElectronic()
    this.updateElectronicForm()
    this.addElectronicForm()
  }

  getAllElectronic(){
    this.electronicService.getAllElectronic().subscribe(response => {
      this.electronicList = response.data
    })
  }

  openLg(content:any) : void{
    this.modalService.openLg(content);
  }

  writeElectronic(electronic:Electronic){
    this._updateElectronicForm.patchValue({
      id:electronic.id, electronicName:electronic.electronicName, electronicEuroPrice:electronic.electronicEuroPrice
     })
  }

  addElectronicForm(){
    this._addElectronicForm = this.formBuilder.group({
      electronicName:["", Validators.required],
      electronicEuroPrice:["", Validators.required]
    })
  }

  updateElectronicForm(){
    this._updateElectronicForm = this.formBuilder.group({
      id:["", Validators.required],
      electronicName:["", Validators.required],
      electronicEuroPrice:["", Validators.required]
    })
  }

  addElectronic(){
    if (this._addElectronicForm.valid) {
      let electronicModel = Object.assign({}, this._addElectronicForm.value)
      this.electronicService.add(electronicModel).pipe(
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
          this.getAllElectronic()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateElectronic(){
    if(this._updateElectronicForm.valid){
      let electronicModel = Object.assign({}, this._updateElectronicForm.value)
      this.electronicService.update(electronicModel).pipe(
        catchError((err:HttpErrorResponse) => {
          if(err.error.Errors.length >0){
            for(let i = 0; i < err.error.Errors.length; i++){
              this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
        }
        return of()
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllElectronic()
        })
    }
  }

  deleteElectronic(electronic:Electronic){
    this.electronicService.delete(electronic).pipe(
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
        this.getAllElectronic()
      })
  }

}
