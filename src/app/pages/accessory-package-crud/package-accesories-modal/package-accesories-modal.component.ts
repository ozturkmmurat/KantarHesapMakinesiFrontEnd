import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, distinctUntilChanged, EMPTY, map, Observable, of, startWith, switchMap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryPackage } from 'src/app/models/accessoryPackage';
import { AccessoryPackageDetail } from 'src/app/models/accessoryPackageDetail';
import { AccessoryPackageDetailDto } from 'src/app/models/Dtos/accessoryPackageDetailDto';
import { AccessoryPackageDetailService } from 'src/app/services/accessoryPackageDetailService/accessory-package-detail.service';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
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

  //#region Injections
  private readonly fb = inject(FormBuilder);
  private readonly detailService = inject(AccessoryPackageDetailService);
  private readonly accessoryService = inject(AccessoryService);
  private readonly toastrService = inject(ToastrService);
  //#endregion

  @Input() accessoryPackage : AccessoryPackage
    //#region Utilities
    private loadAccessoryList(): void {
      this.accessoryService.getAllAccessory().subscribe(
        response => this.accessoryList = response.data
      )
    }

  accessoryList: Accessory[] = []
  accessoryPackageId: number
  accessoryPackageDetail: AccessoryPackageDetail
  accessoryPackageDetailDtoList: AccessoryPackageDetailDto[] = [];
  accessoryPackageDetailForm: FormGroup;
  filterText:any
  



  constructor(
    private accessoryPackageDetailService: AccessoryPackageDetailService,
    private errorService : ErrorService,
    private modalService : ModalService
  ) { }

  ngOnInit(): void {
    this.loadAccessoryList();
    this.buildForm();
    this.getAccessoryPackageDetail();
  }


  private buildForm(): void {
    const { id } = this.accessoryPackage;
    this.accessoryPackageDetailForm = this.fb.group({
      accessoryPackageId: new FormControl(id || 0, { nonNullable: true, validators: [required] }),
      accessoryId: new FormControl(0, { nonNullable: true, validators: [required] }),
      accessoryPcs: new FormControl(1, { nonNullable: true, validators: [required] }),
      accessoryPackageDetails: this.fb.array([])
    })
  }
//#endregion

  getAccessoryPackageDetail(){
    const input = this.accessoryPackageDetailForm.value as any;
    console.log("input yazdırıldı başlangıç", input)
    this.detailService
    .getAllAccessoryPackageDetailDtoById(input.accessoryPackageId)
    .subscribe(({ data }) => {
      data.map(item => {
        const group = this.fb.group({
          accessoryName: new FormControl(item.accessoryName),
          accessoryPackageDetailId: new FormControl<number | undefined>(item.accessoryPackageDetailId),
              accessoryEuroPrice: new FormControl<number | undefined>(item.accessoryEuroPrice),
              accessoryTlPrice: new FormControl<number | undefined>(item.accessoryTlPrice),
              accessoryPackageDetailAccessoryPackageId: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryPackageId),
              accessoryPackageDetailAccessoryId: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryId),
              accessoryPackageDetailAccessoryPcs: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryPcs),
        })
        this.accessoryPackageDetails.push(group)
      });
    })
  }




  get accessoryPackageDetails() {
    return this.accessoryPackageDetailForm.controls['accessoryPackageDetails'] as FormArray;
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


  save(): void {
    if (this.accessoryPackageDetailForm.invalid) {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata");
      return;
    }

    const input = this.accessoryPackageDetailForm.value as any;
    this.detailService.add(input)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.detailService
          .getAllAccessoryPackageDetailDtoById(input.accessoryPackageId)
          .subscribe(({ data }) => {
            data.map(item => {
              const group = this.fb.group({
                accessoryName: new FormControl(item.accessoryName),
                accessoryPackageDetailId: new FormControl<number | undefined>(item.accessoryPackageDetailId),
                accessoryEuroPrice: new FormControl<number | undefined>(item.accessoryEuroPrice),
                accessoryTlPrice: new FormControl<number | undefined>(item.accessoryTlPrice),
                accessoryPackageDetailAccessoryPackageId: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryPackageId),
                accessoryPackageDetailAccessoryId: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryId),
                accessoryPackageDetailAccessoryPcs: new FormControl<number | undefined>(item.accessoryPackageDetailAccessoryPcs),
              })
              this.accessoryPackageDetails.push(group)
            });
          })
          this.accessoryPackageDetails.clear()
          console.log("Reset başarılı mı ?",this.accessoryPackageDetails)
        this.toastrService.success(response.message, "Başarılı")
      })
  }



  update(contact: any, index: number): void {
    if (this.accessoryPackageDetailForm.invalid) {//Validate form
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
      return;
    }
    const input = {
      id:contact.controls.accessoryPackageDetailId.value,
      accessoryId:contact.controls.accessoryPackageDetailAccessoryId.value,
      accessoryPackageId:contact.controls.accessoryPackageDetailAccessoryPackageId.value,
      accessoryPcs:contact.controls.accessoryPackageDetailAccessoryPcs.value
    }
    this.detailService.update(input).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      })
  }



  remove(contact: any, index: number): void {
    const input = {
      id:contact.controls.accessoryPackageDetailId.value,
      accessoryId:contact.controls.accessoryPackageDetailAccessoryId.value,
      accessoryPackageId:contact.controls.accessoryPackageDetailAccessoryPackageId.value,
      accessoryPcs:contact.controls.accessoryPackageDetailAccessoryPcs.value
    }
    this.detailService.delete(input).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.accessoryPackageDetails.controls.splice(index, 1);
      })
  }







}
