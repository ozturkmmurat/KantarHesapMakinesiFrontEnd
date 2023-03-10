import { group } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { PackageAccesoriesModalComponent } from './package-accesories-modal/package-accesories-modal.component';

@Component({
  selector: 'app-accessory-package-crud',
  templateUrl: './accessory-package-crud.component.html',
  styleUrls: ['./accessory-package-crud.component.scss']
})
export class AccessoryPackageCrudComponent implements OnInit {

  //Model Start
  accessoryPackageList: AccessoryPackage[] = [];
  accessoryPackageDetailDtoList: AccessoryPackageDetailDto[] = [];
  accessoryPackageDetailDto: AccessoryPackageDetailDto
  accessoryPackage: AccessoryPackage
  accessoryPackageDetail: AccessoryPackageDetail
  accessoryList: Accessory[] = []
  accessory: Accessory
  //Model End

  //Form Start
  _addAccessoryPackageForm: FormGroup;
  _updateAccessoryPackageForm: FormGroup;
  _accessoryPackageDetailForm: FormGroup;
  //Form End

  accessorySelected: string

  filterText: any


  constructor(
    //Service Start
    private accessoryPackageService: AccessoryPackageService,
    private toastrService: ToastrService,
    private modalService: ModalService,
    private accessoryPackageDetailService: AccessoryPackageDetailService,
    private accessoryService: AccessoryService,
    private errorService: ErrorService,
    //Service End
    private formBuilder: FormBuilder,
  ) { }

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

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  @ViewChild('accessoryPackageDetail') accessoryPackageDetailChild: any;
  selectedModel: AccessoryPackage;
  private openModal(): void {
    this.modalService
      .openXl(this.accessoryPackageDetailChild)
      .dismissed
      .subscribe(() => { });
  }

  add(): void {
    this.selectedModel = {} as AccessoryPackage;
    this.openModal()
  }

  edit(model: AccessoryPackage): void {
    this.selectedModel = model;
    this.openModal()
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

  writeAccessoryPackageForm(accesoryPackage: AccessoryPackage) {
    this._updateAccessoryPackageForm.patchValue({
      id: accesoryPackage.id, accessoryPackageName: accesoryPackage.accessoryPackageName
    })
  }


  addAccessoryPackage() {
    if (this._addAccessoryPackageForm.valid) {
      let accessoryPackageModel = Object.assign({}, this._addAccessoryPackageForm.value)
      this.accessoryPackageService.add(accessoryPackageModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
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
    console.log("Update Check", this._updateAccessoryPackageForm.value)
    if (this._updateAccessoryPackageForm.valid) {
      let accessoryPackageModel = Object.assign({}, this._updateAccessoryPackageForm.value)
      this.accessoryPackageService.update(accessoryPackageModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
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
        this.errorService.checkError(err)
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllAccessoryPackage()
      })
  }
}
