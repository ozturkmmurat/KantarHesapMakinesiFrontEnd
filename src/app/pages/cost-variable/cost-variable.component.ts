import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { CostVariable } from 'src/app/models/costVariable';
import { CostVariableService } from 'src/app/services/costVariableService/cost-variable.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';

@Component({
  selector: 'app-cost-variable',
  templateUrl: './cost-variable.component.html',
  styleUrls: ['./cost-variable.component.scss']
})
export class CostVariableComponent implements OnInit {

  //Model Start
  costVariableList: CostVariable[] = [];
  costVariable: CostVariable
  //Model End

  //Form Start
  _addCostVariableForm: FormGroup;
  _updateCostVariableForm: FormGroup
  //Form End

  p: any

  constructor(
    //Service Start
    private costVariableService: CostVariableService,
    private toastrService: ToastrService,
    private modalService: ModalService,
    private errorServie: ErrorService,
    //Service End

    //Form Start
    private formBuilder: FormBuilder,
    //Form End
  ) { }

  ngOnInit(): void {
    this.getAllCostVariable()
    this.addCostVariableForm()
    this.updateCostVariableForm()
  }

  openLg(content: any) {
    this.modalService.openLg(content)
  }

  addCostVariableForm() {
    this._addCostVariableForm = this.formBuilder.group({
      costVariableName:["",Validators.required],
      iProfile: ["", Validators.required],
      shateIron: ["", Validators.required],
      fireShateIronAndIProfilePercentage: ["", Validators.required],
      fireTotalPercentAge: ["", Validators.required],
      laborCostPerHourEuro:["", Validators.required],
      overheadPercentage:["", Validators.required]
    })
  }

  updateCostVariableForm() {
    this._updateCostVariableForm = this.formBuilder.group({
      id: ["", Validators.required],
      costVariableName:["",Validators.required],
      iProfile: ["", Validators.required],
      shateIron: ["", Validators.required],
      fireShateIronAndIProfilePercentage: ["", Validators.required],
      fireTotalPercentAge: ["", Validators.required],
      laborCostPerHourEuro:["", Validators.required],
      overheadPercentage:["", Validators.required]
    })
  }

  getAllCostVariable() {
    this.costVariableService.getAllCostVariable().subscribe(response => {
      this.costVariableList = response.data
    })
  }

  writeUpdateCostVariableForm(costVariable: CostVariable) {
    this._updateCostVariableForm.patchValue({
      id: costVariable.id, costVariableName:costVariable.costVariableName,  iProfile: costVariable.iProfile, shateIron:costVariable.shateIron, fireShateIronAndIProfilePercentage: costVariable.fireShateIronAndIProfilePercentage,
      fireTotalPercentAge: costVariable.fireTotalPercentAge, laborCostPerHourEuro:costVariable.laborCostPerHourEuro, overheadPercentage:costVariable.overheadPercentage
    })
  }

  addCostVariable() {
    if (this._addCostVariableForm.valid) {
      let costVariableModel = Object.assign({}, this._addCostVariableForm.value)
      this.costVariableService.add(costVariableModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorServie.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllCostVariable()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateCostVariable() {
    if (this._updateCostVariableForm.valid) {
      let costVariableModel = Object.assign({}, this._updateCostVariableForm.value)
      this.costVariableService.update(costVariableModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorServie.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllCostVariable()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteCostVariable(costVariable: CostVariable) {
    this.costVariableService.delete(costVariable).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorServie.checkError(err)
        return EMPTY
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllCostVariable();
      })
  }

}
