import { group } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryPackage } from 'src/app/models/accessoryPackage';
import { AccessoryPackageDetail } from 'src/app/models/accessoryPackageDetail';
import { AccessoryPackageDetailDto } from 'src/app/models/Dtos/accessoryPackageDetailDto';
import { AccessoryPackageDetailService } from 'src/app/services/accessoryPackageDetailService/accessory-package-detail.service';
import { AccessoryPackageService } from 'src/app/services/accessoryPackageService/accessory-package.service';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { PackageAccesoriesModalComponent } from './package-accesories-modal/package-accesories-modal.component';

@Component({
  selector: 'app-accessory-package-crud',
  templateUrl: './accessory-package-crud.component.html',
  styleUrls: ['./accessory-package-crud.component.scss']
})
export class AccessoryPackageCrudComponent implements OnInit {
  
  accessoryPackageList: AccessoryPackage[] = [];
  accessoryPackageDetailDtoList: AccessoryPackageDetailDto[] = [];
  accessoryPackageDetailDto: AccessoryPackageDetailDto
  accessoryPackage: AccessoryPackage
  accessoryPackageDetail: AccessoryPackageDetail
  accessoryList: Accessory[] = []
  accessory: Accessory
  accessorySelected: string
  _addAccessoryPackageForm: FormGroup;
  _updateAccessoryPackageForm: FormGroup;
  _accessoryPackageDetailForm: FormGroup;
  filterText: any
  constructor(
    private accessoryPackageService: AccessoryPackageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private modalService: ModalService,
    private accessoryPackageDetailService: AccessoryPackageDetailService,
    private accessoryService: AccessoryService) { }

  ngOnInit(): void {
    this.getAllAccessoryPackage()
    this.addAccessoryPackageForm()
    this.updateAccessoryPackageForm()
    this.getAllAccesory()
    this.getAllAccessoryPackageDetailDto()
  }

  addAccessoryPackageForm() {
    this._addAccessoryPackageForm = this.formBuilder.group({
      accessoryPackageName: ["", Validators.required]
    })
  }

  updateAccessoryPackageForm() {
    this._updateAccessoryPackageForm = this.formBuilder.group({
      id: ["", Validators.required],
      accessoryPackageName: ["", Validators.required]
    })
  }

  get accessoryPackageDetailFormArray() {
    console.log("Giriş yapıldı")
    console.log("Test", this.accessoryPackageDetailService._accessoryPackageDetailForm.get('accessoryPackageDetailArray') as FormArray)
    return this.accessoryPackageDetailService.accessoryPackageDetailFormArray
  }

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  openXl(content: any): void {

    this.modalService.openXl(content).dismissed.subscribe(() => {
      console.log("kapandı");
      (this.accessoryPackageDetailService._accessoryPackageDetailForm.get('accessoryPackageDetailArray') as FormArray).clear()
    })
  }
  writeAccessoryPackage(accesoryPackage: AccessoryPackage) {
    this.accessoryPackageDetailService.writeAccessoryPackage(accesoryPackage.id)
  }

  writeAddAccessoryPackagaDetail(accesoryPackage: AccessoryPackage) {
    this.accessoryPackageDetailService.writeAddAccessoryPackagaDetail(accesoryPackage)
  }

  writeAccessoryChange(accessoryPackageDetail: AccessoryPackageDetailDto, target: any) {
    if (accessoryPackageDetail.accessoryId != 0) {
      for (let index = 0; index < this.accessoryPackageDetailDtoList.length; index++) {
        if (this.accessoryPackageDetailDtoList[index].accessoryId == accessoryPackageDetail.accessoryId) {
          this.selectedValue(target)
          this.getAccessoryByName(this.selectedValue(target))
          setTimeout(() => {
            this.accessoryPackageDetailDtoList[index].accessoryEuroPrice = this.accessory.accessoryEuroPrice
            this.accessoryPackageDetailDtoList[index].accessoryTlPrice = this.accessory.accessoryTlPrice
            this._accessoryPackageDetailForm.patchValue({
              accessoryId: accessoryPackageDetail.accessoryId, id: accessoryPackageDetail.accessoryPackageDetailId, accessoryPcs: accessoryPackageDetail.accessoryPackageDetailAccessoryPcs
            })
          }, 100);
        }
      }
    }
  }

  editaAccessoryPackageDetail(accessoryPackageDetailDto: any) {
    var result = this.accessoryPackageDetail = {
      id: accessoryPackageDetailDto.accessoryPackageDetailId, accessoryId: parseInt(accessoryPackageDetailDto.accessoryPackageDetailAccessoryId),
      accessoryPcs: accessoryPackageDetailDto.accessoryPackageDetailAccessoryPcs, accessoryPackageId: accessoryPackageDetailDto.accessoryPackageDetailAccessoryPackageId
    }
    return result
  }

  editAccessoryPackage(accesoryPackageDetailsDto: AccessoryPackageDetailDto) {
    var editAccessoryPackage = this.accessoryPackage = {
      id: accesoryPackageDetailsDto.accessoryPackageDetailAccessoryPackageId, accessoryPackageName: accesoryPackageDetailsDto.accessoryPackageName
    }
    return editAccessoryPackage
  }

  selectedValue(value: any) {
    this.accessorySelected = value.target['value']
    return this.accessorySelected
  }

  getAllAccessoryPackage() {
    this.accessoryPackageService.getAllAccessoryPackage().subscribe(response => {
      this.accessoryPackageList = response.data
    })
  }

  getAllAccesory() {
    this.accessoryService.getAllAccessory().subscribe(response => {
      this.accessoryList = response.data
    })
  }

  getAllAccessoryPackageDetailDto() {
    this.accessoryPackageDetailService.getAllAccessoryPackageDetailDto().subscribe(response => {
      this.accessoryPackageDetailDtoList = response.data
    })
  }

  getAccessoryByName(value: string) {
    if (this.accessorySelected != null) {
      this.accessoryService.getByName(value).subscribe(response => {
        this.accessory = response.data
      })
    }
  }

  getAllAccessoryPackageDetailDtoById(packageId: number) {
    console.log("Get All Paket id", packageId)
    this.accessoryPackageDetailService.getAllAccessoryPackageDetailDtoById(packageId).subscribe(response => {
      console.log("Response data ", response.data)
      this.accessoryPackageDetailDtoList = response.data
      console.log("Dto Listesi", this.accessoryPackageDetailDtoList)
    })
  }

  getAccessoryPackageDetailDtoById(id: number) {
    this.accessoryPackageDetailService.getAccesoryPackageDtoById(id).subscribe(response => {
      this.accessoryPackageDetailDto = response.data
    })
  }

  addAccessoryPackage() {
    if (this._addAccessoryPackageForm.valid) {
      let accessoryPackageModel = Object.assign({}, this._addAccessoryPackageForm.value)
      this.accessoryPackageService.add(accessoryPackageModel).pipe(
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
          this.getAllAccessoryPackage()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateAccessoryPackage() {
    if (this._updateAccessoryPackageForm.valid) {
      let accessoryPackageModel = Object.assign({}, this._updateAccessoryPackageForm.value)
      this.accessoryPackageService.update(accessoryPackageModel).pipe(
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
          this.getAllAccessoryPackage()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun", "Hata")
    }
  }

  deleteAccessoryPackage(accesoryPackage: AccessoryPackage) {
    this.accessoryPackageService.delete(accesoryPackage).pipe(
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
        this.getAllAccessoryPackage()
      })
  }
}
