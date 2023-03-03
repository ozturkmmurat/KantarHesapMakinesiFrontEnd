import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryPackageDetail } from 'src/app/models/accessoryPackageDetail';
import { AccessoryPackageDetailDto } from 'src/app/models/Dtos/accessoryPackageDetailDto';
import { AccessoryPackageDetailService } from 'src/app/services/accessoryPackageDetailService/accessory-package-detail.service';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
const { required, min } = Validators;


@Component({
  selector: 'app-package-accesories-modal',
  templateUrl: './package-accesories-modal.component.html',
  styleUrls: ['./package-accesories-modal.component.scss']
})
export class PackageAccesoriesModalComponent implements OnInit {
  form: FormGroup = inject(FormBuilder).group({
    accessoryId: new FormControl(0, { nonNullable: true, validators: [required] }),
    quantity: new FormControl(0, { nonNullable: true, validators: [required, min(1)] })
  });

  accessoryPackageDetailList$: Observable<any[]>;
  accessoryList: Accessory[] = []
  accessoryPackageId: number
  accessoryPackageDetail: AccessoryPackageDetail
  accessoryPackageDetailDtoList: AccessoryPackageDetailDto[] = [];
  _accessoryPackageDetailForm: FormGroup;
  _addAccessoryPackageDetailForm: FormGroup;
  filterText:any

  constructor(
    private toastrService: ToastrService,
    private accessoryPackageDetailService: AccessoryPackageDetailService,
    private accessoryService: AccessoryService
  ) { }

  ngOnInit(): void {
    this.updateAccessoryPackageDetailForm()
    this.addAccessoryPackageDetailForm()
    this.getAllAccesory()
  }

  addAccessoryPackageDetailForm() {
    this.accessoryPackageDetailService.addAccessoryPackageDetailForm()
    this._addAccessoryPackageDetailForm = this.accessoryPackageDetailService._addAccessoryPackageDetailForm
  }

  updateAccessoryPackageDetailForm() {
    this.accessoryPackageDetailService.updateAccessoryPackageDetailForm()
    this._accessoryPackageDetailForm = this.accessoryPackageDetailService._accessoryPackageDetailForm
  }

  get accessoryPackageDetailFormArray() {
    return this.accessoryPackageDetailService.accessoryPackageDetailFormArray
  }


  getAllAccesory() {
    this.accessoryService.getAllAccessory().subscribe(response => {
      this.accessoryList = response.data
    })
  }

  getAllAccessoryPackageDetailDtoById(packageId: number) {
    this.accessoryPackageDetailService.getAllAccessoryPackageDetailDtoById(packageId).subscribe(response => {
      this.accessoryPackageDetailDtoList = response.data
    })
  }

  editaAccessoryPackageDetail(accessoryPackageDetailDto: any) {
    var result = this.accessoryPackageDetail = {
      id: accessoryPackageDetailDto.accessoryPackageDetailId, accessoryId: parseInt(accessoryPackageDetailDto.accessoryPackageDetailAccessoryId),
      accessoryPcs: accessoryPackageDetailDto.accessoryPackageDetailAccessoryPcs, accessoryPackageId: accessoryPackageDetailDto.accessoryPackageDetailAccessoryPackageId
    }
    return result
  }

  addAccessoryPackageDetail() {
    console.log("Boş mu dolu mu ?",this._addAccessoryPackageDetailForm.value)
    if (this._addAccessoryPackageDetailForm.valid) {
      let accessoryPackageDetailModel = Object.assign({}, this._addAccessoryPackageDetailForm.value)
      this.accessoryPackageDetailService.add(accessoryPackageDetailModel).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
          return of();
        }))
        .subscribe(response => {
          (this.accessoryPackageDetailService._accessoryPackageDetailForm.get('accessoryPackageDetailArray') as FormArray).clear()
          this.accessoryPackageDetailService.writeAccessoryPackage(this._addAccessoryPackageDetailForm.value.accessoryPackageId)
          this.toastrService.success(response.message, "Başarılı")
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun", "Hata")
    }
  }

  deleteAccessoryPackageDetail(accessoryPackageDetail: any, index: number) {
    this.accessoryPackageId = accessoryPackageDetail.accessoryPackageDetailAccessoryPackageId
    var result = this.editaAccessoryPackageDetail(this.accessoryPackageDetailFormArray.controls[index].value)
    this.accessoryPackageDetailService.delete(result).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.Errors.length > 0) {
          for (let i = 0; i < err.error.Errors.length; i++) {
            this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
          }
        }
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.removeAccessoryPackageDetailForm(index)
      })
  }

  removeAccessoryPackageDetailForm(index: number) {
    this._accessoryPackageDetailForm.get('accessoryPackageDetailArray')["controls"].splice(index, 1)
  }

  updateAccessorPackageDetail(accessoryPackageDetail: any, index: number) {
    this.accessoryPackageDetail = this.editaAccessoryPackageDetail(this.accessoryPackageDetailFormArray.controls[index].value)
    if (this._accessoryPackageDetailForm.valid) {
      this.accessoryPackageDetailService.update(this.accessoryPackageDetail).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllAccessoryPackageDetailDtoById(this.editaAccessoryPackageDetail(accessoryPackageDetail).accessoryPackageId)
        })
    } else {
      this.toastrService.error("Formu eksiksiz doldurun", "Hata")
    }
  }


}
