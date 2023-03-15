import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryPackage } from 'src/app/models/accessoryPackage';
import { AccessoryPackageDetailDto } from 'src/app/models/Dtos/accessoryPackageDetailDto';
import { Electronic } from 'src/app/models/electronic';
import { Model } from 'src/app/models/model';
import { ModelAccessoryDetail } from 'src/app/models/modelAccessoryDetail';
import { ModelAccessoryDetailDto } from 'src/app/models/Dtos/modelAccessoryDetailDto';
import { ModelElectronicDetail } from 'src/app/models/modelElectronicDetail';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { AccessoryPackageDetailService } from 'src/app/services/accessoryPackageDetailService/accessory-package-detail.service';
import { AccessoryPackageService } from 'src/app/services/accessoryPackageService/accessory-package.service';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ModelAccessoryDetailService } from 'src/app/services/modelAccessoryDetailService/model-accessory-detail.service';
import { ModelElectronicDetailService } from 'src/app/services/modelElectronicDetailService/model-electronic-detail.service';
import { ModelService } from 'src/app/services/modelService/model.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { CostVariable } from 'src/app/models/costVariable';
import { CostVariableService } from 'src/app/services/costVariableService/cost-variable.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-model-crud',
  templateUrl: './model-crud.component.html',
})
export class ModelCrudComponent implements OnInit {
  //List Start
  modelList: Model[] = [];
  modelAccessoryDetailList: ModelAccessoryDetail[] = [];
  modelAccessoryDetailDtoList: ModelAccessoryDetailDto[] = []
  modelElectronicDetailList: ModelElectronicDetail[] = [];
  accessoryPackageList: AccessoryPackage[] = [];
  productList: ProductDto[] = [];
  electronicList: Electronic[] = [];
  costVariableList : CostVariable[] = [];
  // List End

  // Form Start
  _addModelForm: FormGroup;
  _updateModelForm: FormGroup;
  _addModelAccesoryDetail: FormGroup;
  _updateModelAccessoryDetail: FormGroup;
  //Form End

  filterText:any
  p: any
  selected = "";
  selectedValue = ""

  constructor(
    //Service Start
    private modelService: ModelService,
    private modalService: ModalService,
    private accessoryPackageService: AccessoryPackageService,
    private modelAccessoryDetailService: ModelAccessoryDetailService,
    private modelElectronicDetailService: ModelElectronicDetailService,
    private electronicService: ElectronicService,
    private costVariableService : CostVariableService,
    //Service End
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService,
    private errorService : ErrorService
    //Data Table
    
  ) { }

  ngOnInit(): void {
    this.getAllModel()
    this.getAllProduct()
    this.getAllElectronic()
    this.getAllAccessoryPackage()
    this.getAllCostVariable()
    this.addModellForm()
    this.updateModelForm()
    this.addModelAccessoryDetailForm()
    this.updateModelAccessoryDetailForm()
  }

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  onSelected(formName : any) {
    for (let index = 0; index < this.productList.length; index++) {
      if (formName.value.modelProductId == this.productList[index].productId) {
        this.selectedValue = this.productList[index].productName
        console.log("Seçilen veri",this.selectedValue)
      }
    }
  }
  writeModel(model: Model) {
    this._updateModelForm.patchValue({
      modelId: model.id, modelMostSizeKg: model.mostSizeKg, modelProductId: model.productId, modelNetWeight: model.netWeight,
      modelProductionTime: model.productionTime, modelShateIronWeight: model.shateIronWeight, modelIProfilWeight: model.iProfilWeight
    })
  }



  @ViewChild('modelElectronicDetail') modelElectronicDetail: any;
  selectedModel: Model;

  private openModal(): void {
    this.modalService
      .openXl(this.modelElectronicDetail)
      .dismissed
      .subscribe(() => { });
  }

  add(): void {
    this.selectedModel = {} as Model;
    this.openModal()
  }

  edit(model: Model): void {
    this.selectedModel = model;
    this.openModal()
  }

  writeUpdateModelAccessoryDetail(model: Model) {
    this.modelAccessoryDetailService.getModelAccesoryDetailDtoByModelId(model.id).subscribe(response => {

      this._updateModelAccessoryDetail.patchValue({
        id:response.data.modelAccessoryDetailsId, modelId:response.data.modelId, accessoryPackageDetailId:response.data.accessoryPackageDetailAccessoryPackageId
      })
    })
  }

  writeAddModelAccessoryDetail(model:Model){
    this._addModelAccesoryDetail.patchValue({
      modelId:model.id
    })
  }

  addModellForm() {
    this._addModelForm = this.formBuilder.group({
      modelProductId: ["", Validators.required],
      costVariableId: ["", Validators.required],
      modelMostSizeKg: ["", Validators.required],
      modelNetWeight: ["", Validators.required],
      modelProductionTime: ["", Validators.required],
      modelShateIronWeight: ["", Validators.required],
      modelIProfilWeight: ["", Validators.required]
    })
  }

  updateModelForm() {
    this._updateModelForm = this.formBuilder.group({
      modelId: ["", Validators.required],
      modelProductId: ["", Validators.required],
      costVariableId: ["", Validators.required],
      modelMostSizeKg: ["", Validators.required],
      modelNetWeight: ["", Validators.required],
      modelProductionTime: ["", Validators.required],
      modelShateIronWeight: ["", Validators.required],
      modelIProfilWeight: ["", Validators.required]
    })
  }

  addModelAccessoryDetailForm() {
    this._addModelAccesoryDetail = this.formBuilder.group({
      modelId: ["", Validators.required],
      accessoryPackageDetailId: ["", Validators.required]
    })
  }

  updateModelAccessoryDetailForm() {
    this._updateModelAccessoryDetail = this.formBuilder.group({
      id: ["", Validators.required],
      modelId: ["", Validators.required],
      accessoryPackageDetailId: ["", Validators.required]
    })
  }

  getAllModel() {
    this.modelService.getAllModel().subscribe(response => {
      this.modelList = response.data
    })

  }

  getAllProduct() {
    this.productService.getAllProductDto().subscribe(response => {
      this.productList = response.data
    })
  }

  getAllAccessoryPackage() {
    this.accessoryPackageService.getAllAccessoryPackage().subscribe(response => {
      console.log(response.data)
      this.accessoryPackageList = response.data
    })
  }

  getAllElectronic() {
    this.electronicService.getAllElectronic().subscribe(response => {
      this.electronicList = response.data
    })
  }

  getAllModelAccessoryDetail() {
    this.modelAccessoryDetailService.getAllModelAccessoryDetail().subscribe(response => {
      this.modelAccessoryDetailList = response.data
    })
  }

  getAllModelAccessoryDetailByModelIdProductId(modelId: number) {
    this.modelAccessoryDetailService.getAllModelAccessoryDetailByModelId(modelId).subscribe(response => {
      this.modelAccessoryDetailDtoList = response.data
    })
  }

  getAllCostVariable(){
    this.costVariableService.getAllCostVariable().subscribe(response => {
      this.costVariableList = response.data
    })
  }



  addModel() {
    console.log("Model add check",this._addModelForm.value)
    if (this._addModelForm.valid) {
      let model = Object.assign({}, this._addModelForm.value)
      model.modelMostSizeKg += " " + this.selectedValue
      this.modelService.add(model).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllModel()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateModel() {
    console.log("Model update check ",this._updateModelForm.value)
    if (this._updateModelForm.valid) {
      let model = Object.assign({}, this._updateModelForm.value)
      model.modelMostSizeKg += " " + this.selectedValue
      this.modelService.update(model).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllModel()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteModel(model: Model) {
    this.modelService.delete(model).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllModel()
      })
  }

  addModelAccessoryDetail() {
    console.log("Model aksesuar paketi eklenme",this._addModelAccesoryDetail.value)
    if (this._addModelAccesoryDetail.valid) {
      let modelAccessoryDetail = Object.assign({}, this._addModelAccesoryDetail.value)
      this.modelAccessoryDetailService.add(modelAccessoryDetail).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı");
          this.getAllModelAccessoryDetail()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateModelAccessoryDetail() {
    console.log("Update accesory package",this._updateModelAccessoryDetail.value)
    if (this._updateModelAccessoryDetail.valid) {
      let modelAccesoryDetail = Object.assign({}, this._updateModelAccessoryDetail.value)
      this.modelAccessoryDetailService.update(modelAccesoryDetail).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllModelAccessoryDetail()
        })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  deleteModelAccesoryDetail(modelAccesoryDetail: ModelAccessoryDetail) {
    this.modelAccessoryDetailService.delete(modelAccesoryDetail).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAllModel()
      })
  }
}
