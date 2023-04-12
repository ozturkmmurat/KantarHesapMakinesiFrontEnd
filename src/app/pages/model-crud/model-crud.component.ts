import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { Model } from 'src/app/models/model';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { ElectronicService } from 'src/app/services/electronicService/electronic.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ModelService } from 'src/app/services/modelService/model.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { CostVariable } from 'src/app/models/costVariable';
import { CostVariableService } from 'src/app/services/costVariableService/cost-variable.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { SizeService } from 'src/app/services/sizeService/size.service';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-model-crud',
  templateUrl: './model-crud.component.html',
})
export class ModelCrudComponent implements OnInit {
  //List Start
  modelList: Model[] = [];
  productList: ProductDto[] = [];
  electronicList: Electronic[] = [];
  costVariableList: CostVariable[] = [];
  sizeList: Size[] = [];
  // List End

  // Form Start
  _addModelForm: FormGroup;
  _updateModelForm: FormGroup;
  //Form End

  filterText: any
  p: any
  selected = "";
  selectedValue = ""

  constructor(
    //Service Start
    private modelService: ModelService,
    private modalService: ModalService,
    private electronicService: ElectronicService,
    private costVariableService: CostVariableService,
    private sizeService: SizeService,
    //Service End
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private productService: ProductService,
    private errorService: ErrorService
    //Data Table

  ) { }

  ngOnInit(): void {
    this.getAllModel()
    this.getAllProduct()
    this.getAllElectronic()
    this.getAllCostVariable()
    this.getAllSize()
    this.addModellForm()
    this.updateModelForm()
  }

  openLg(content: any): void {
    this.modalService.openLg(content);
  }

  onSelected(formName: any) {
    for (let index = 0; index < this.productList.length; index++) {
      if (formName.value.modelProductId == this.productList[index].productId) {
        this.selectedValue = this.productList[index].productName
      }
    }
  }
  writeModel(model: Model) {
    this._updateModelForm.patchValue({
      modelId: model.id, costVariableId:model.costVariableId, modelSizeId:model.sizeId,  modelMostSizeKg: model.mostSizeKg, modelProductId: model.productId,
      modelProductionTime: model.productionTime, modelShateIronWeight: model.shateIronWeight, modelIProfilWeight: model.iProfilWeight
    })
  }

  addModellForm() {
    this._addModelForm = this.formBuilder.group({
      modelProductId: ["", Validators.required],
      costVariableId: [7, Validators.required],
      modelSizeId: ["", Validators.required],
      modelProductionTime: ["", Validators.required],
      modelShateIronWeight: ["", Validators.required],
      modelIProfilWeight: ["", Validators.required],
    })
  }

  updateModelForm() {
    this._updateModelForm = this.formBuilder.group({
      modelId: ["", Validators.required],
      modelProductId: ["", Validators.required],
      costVariableId: ["", Validators.required],
      modelSizeId: ["", Validators.required],
      modelProductionTime: ["", Validators.required],
      modelShateIronWeight: ["", Validators.required],
      modelIProfilWeight: ["", Validators.required],
    })
  }

  getAllModel() {
    this.modelService.getAllModel().pipe(
    catchError((err: HttpErrorResponse) => {
      this.errorService.checkError(err)
      return of();
    }))
    .subscribe(response => {
      this.modelList = response.data
    })
  }

  getAllProduct() {
    this.productService.getAllProductDto().subscribe(response => {
      this.productList = response.data
    })
  }


  getAllElectronic() {
    this.electronicService.getAllElectronic().subscribe(response => {
      this.electronicList = response.data
    })
  }

  getAllSize() {
    this.sizeService.getAllSize().subscribe(response => {
      this.sizeList = response.data
    })
  }


  getAllCostVariable() {
    this.costVariableService.getAllCostVariable().subscribe(response => {
      this.costVariableList = response.data
    })
  }



  addModel() {
    if (this._addModelForm.valid) {
      let sizeModel
      this.sizeService.getById(this._addModelForm.value.modelSizeId).subscribe(response => {
        sizeModel = response.data
        let model = Object.assign({}, this._addModelForm.value)
        model.modelMostSizeKg = sizeModel.aspect + " " + sizeModel.weight + " " + this.selectedValue
        this.modelService.add(model).pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err)
            return of();
          }))
          .subscribe(response => {
            this.toastrService.success(response.message, "Başarılı");
            this.getAllModel()
          })
      })
    }
    else {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
    }
  }

  updateModel() {
    if (this._updateModelForm.valid) {
      let model = Object.assign({}, this._updateModelForm.value)
      let sizeModel
      this.sizeService.getById(this._updateModelForm.value.modelSizeId).subscribe(response => {
        sizeModel = response.data
        this.onSelected(this._updateModelForm)
        let model = Object.assign({}, this._updateModelForm.value)
        model.modelMostSizeKg = sizeModel.aspect + " " + sizeModel.weight + " " + this.selectedValue
        this.modelService.update(model).pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err)
            return of();
          }))
          .subscribe(response => {
            this.toastrService.success(response.message, "Başarılı")
            this.getAllModel()
          })
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

}
