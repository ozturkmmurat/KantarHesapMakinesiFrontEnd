import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { clippingParents } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { Model } from 'src/app/models/model';
import { ModelElectronicDetail } from 'src/app/models/modelElectronicDetail';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ModelElectronicDetailService } from 'src/app/services/modelElectronicDetailService/model-electronic-detail.service';

const { required } = Validators;
@Component({
  selector: 'app-model-electronic-detail-modal',
  templateUrl: './model-electronic-detail-modal.component.html',
})
export class ModelElectronicDetailModalComponent implements OnInit {
  //#region Injections
  private readonly fb = inject(FormBuilder);
  private readonly detailService = inject(ModelElectronicDetailService);
  private readonly electronicService = inject(ElectronicService);
  private readonly toastrService = inject(ToastrService);
  //#endregion

  //#region Fields
  electronicList: Electronic[] = [];
  electronicDetailForm: FormGroup;

  _electronicDetailForm: FormGroup;
  _addModelElectronicDetailForm: FormGroup;

  @Input() model: Model;
  //#endregion


  //#region Utilities
  private loadElectronicList(): void {
    this.electronicService.getAllElectronic().subscribe(
      response => this.electronicList = response.data
    )
  }

  private buildForm(): void {
    const { id } = this.model;
    this.electronicDetailForm = this.fb.group({
      modelId: new FormControl(id || 0, { nonNullable: true, validators: [required] }),
      electronicId: new FormControl(0, { nonNullable: true, validators: [required] }),
      electronicPcs: new FormControl(1, { nonNullable: true, validators: [required] }),
      electronicDetails: this.fb.array([])
    })
  }
  get electronicDetails() {
    return this.electronicDetailForm.controls['electronicDetails'] as FormArray;
  }
  //#endregion


  ngOnInit(): void {
    this.loadElectronicList();
    this.buildForm();
    this.getElectronicDetail();
  }

  getElectronicDetail(){
    const input = this.electronicDetailForm.value as any;
    this.detailService
    .getAllModelElectronicDetailDtoByModelId(input.modelId)
    .subscribe(({ data }) => {
      data.map(item => {
        const group = this.fb.group({
          electronicName: new FormControl(item.electronicName),
          electronicEuroPrice: new FormControl(item.electronicEuroPrice),
          electronicTlPrice: new FormControl(item.electronicTlPrice),
          modelElectronicDetailsId: new FormControl(item.modelElectronicDetailsId),
          modelElectronicDetailsModelId: new FormControl(item.modelElectronicDetailsModelId),
          modelElectronicDetailsElectronicId: new FormControl(item.modelElectronicDetailsElectronicId),
          modelElectronicDetailsElectronicPcs: new FormControl(item.modelElectronicDetailsElectronicPcs)
        })
        this.electronicDetails.push(group)
      });
    })
  }

  save(): void {
    if (this.electronicDetailForm.invalid) {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata");
      return;
    }

    const input = this.electronicDetailForm.value as any;
    this.detailService.add(input)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.detailService
          .getAllModelElectronicDetailDtoByModelId(input.modelId)
          .subscribe(({ data }) => {
            data.map(item => {
              const group = this.fb.group({
                electronicName: new FormControl(item.electronicName),
                electronicEuroPrice: new FormControl(item.electronicEuroPrice),
                electronicTlPrice: new FormControl(item.electronicTlPrice),
                modelElectronicDetailsId: new FormControl(item.modelElectronicDetailsId),
                modelElectronicDetailsModelId: new FormControl(item.modelElectronicDetailsModelId),
                modelElectronicDetailsElectronicId: new FormControl(item.modelElectronicDetailsElectronicId),
                modelElectronicDetailsElectronicPcs: new FormControl(item.modelElectronicDetailsElectronicPcs)
              })
              this.electronicDetails.push(group)
            });
          })
          this.electronicDetails.clear()
        this.toastrService.success(response.message, "Başarılı")
      })
  }

  update(contact: any, index: number): void {
    if (this.electronicDetailForm.invalid) {//Validate form
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
      return;
    }
    const input = {
      id:contact.controls.modelElectronicDetailsId.value,
      modelId:contact.controls.modelElectronicDetailsModelId.value,
      electronicId:Number(contact.controls.modelElectronicDetailsElectronicId.value),
      electronicPcs:contact.controls.modelElectronicDetailsElectronicPcs.value
    }
    this.detailService.update(input).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log("update error",err)
        if (err.error.Errors.length > 0) {
          for (let i = 0; i < err.error.Errors.length; i++) {
            this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
          }
        }
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      })
  }

  remove(contact: any, index: number): void {
    console.log("Contact yazdırıldı",contact);
    const input = {
      id:contact.controls.modelElectronicDetailsId.value,
      modelId:contact.controls.modelElectronicDetailsModelId.value,
      electronicId:Number(contact.controls.modelElectronicDetailsElectronicId.value),
      electronicPcs:contact.controls.modelElectronicDetailsElectronicPcs.value
    }
    this.detailService.delete(input).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error.Errors.length > 0) {
          for (let i = 0; i < err.error.Errors.length; i++) {
            this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
          }
        }
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.electronicDetails.controls.splice(index, 1);
      })
  }
}
