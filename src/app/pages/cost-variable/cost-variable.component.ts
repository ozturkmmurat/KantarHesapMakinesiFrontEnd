import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CostVariable } from 'src/app/models/costVariable';
import { CostVariableService } from 'src/app/services/costVariableService/cost-variable.service';
import { ModalService } from 'src/app/services/modalService/modal.service';

@Component({
  selector: 'app-cost-variable',
  templateUrl: './cost-variable.component.html',
  styleUrls: ['./cost-variable.component.scss']
})
export class CostVariableComponent implements OnInit {

  //Model Start
  costVariableList : CostVariable[] = [];
  costVariable : CostVariable
  //Model End

  //Form Start
  _addCostVariableForm : FormGroup;
  _updateCostVariableForm : FormGroup
  //Form End

  p:any

  constructor(
    //Service Start
    private costVariableService:CostVariableService,
    private toastrService : ToastrService,
    private modalService : ModalService,
    //Service End
    //Form Start
    private formBuilder : FormBuilder,
    //Form End
  ) { }

  ngOnInit(): void {
    this.getAllCostVariable()
    this.addCostVariableForm()
    this.updateCostVariableForm()
  }

  openLg(content : any){
    this.modalService.openLg(content)
  }

  addCostVariableForm(){
    this._addCostVariableForm = this.formBuilder.group({
      iProfile:["", Validators.required],
      xValue:["", Validators.required],
      yValue:["",Validators.required],
      fireShateIronAndIProfilePercentage:["",Validators.required],
      fireTotalPercentAge:["",Validators.required],
      firePercentAge:["",Validators.required]
    })
  }

  updateCostVariableForm(){
    this._updateCostVariableForm = this.formBuilder.group({
      id:["",Validators.required],
      iProfile:["", Validators.required],
      xValue:["", Validators.required],
      yValue:["",Validators.required],
      fireShateIronAndIProfilePercentage:["",Validators.required],
      fireTotalPercentAge:["",Validators.required],
      firePercentAge:["",Validators.required]
    })
  }

  getAllCostVariable(){
    this.costVariableService.getAllCostVariable().subscribe(response => {
      this.costVariableList = response.data
      console.log(response.data)
    })
  }

  writeUpdateCostVariableForm(costVariable : CostVariable){
    this._updateCostVariableForm.patchValue({
      id:costVariable.id, iProfile:costVariable.iProfile, fireShateIronAndIProfilePercentage:costVariable.fireShateIronAndIProfilePercentage,
      fireTotalPercentAge:costVariable.fireTotalPercentAge, firePercentAge:costVariable.firePercentAge
    })
  }

  addCostVariable(){
    console.log("Add costVariable check", this._addCostVariableForm.value)
    if(this._addCostVariableForm.valid){
      let costVariableModel = Object.assign({}, this._addCostVariableForm.value)
      console.log("Cost Variable Add", costVariableModel,this._addCostVariableForm.value.xValue,this._addCostVariableForm.value.yValue)
      this.costVariableService.add(costVariableModel).pipe(
        catchError((err : HttpErrorResponse) => {
          if(err.error.Errors.length >0){
            for(let i = 0; i < err.error.Errors.length; i++){
              this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
        }
        return EMPTY;
        }))
        .subscribe(response =>  {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllCostVariable()
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateCostVariable(){
    console.log(this._updateCostVariableForm.value)
    if (this._updateCostVariableForm.valid) {
      let costVariableModel = Object.assign({}, this._updateCostVariableForm.value)
      this.costVariableService.update(costVariableModel).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log("err", err)
        if(err.error.Errors.length >0){
          for(let i = 0; i < err.error.Errors.length; i++){
            this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
          }
      }
      return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllCostVariable()
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteCostVariable(costVariable : CostVariable){
    this.costVariableService.delete(costVariable).pipe(
      catchError((err : HttpErrorResponse) => {
        if(err.error.Errors.length >0){
          for(let i = 0; i < err.error.Errors.length; i++){
            this.toastrService.error(err.error.Errors[i].errorMessage,"Doğrulama hatası")
          }
        }
          return EMPTY
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllCostVariable();
      })
  }

}
