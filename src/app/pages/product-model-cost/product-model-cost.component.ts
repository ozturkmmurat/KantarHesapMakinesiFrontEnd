import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of } from 'rxjs';
import { InstallationCost } from 'src/app/models/installationCost';
import { InstallationCostDto } from 'src/app/models/Dtos/installationCostDto';
import { Location } from 'src/app/models/location';
import { ProductModelCost } from 'src/app/models/productModelCost';
import { ProductModelCostDetailDto } from 'src/app/models/Dtos/productModelCostDetailDto';
import { ProductModelCostDetailSelectListDto } from 'src/app/models/Dtos/productModelCostDetailSelectListDto';
import { ProductModelCostDto } from 'src/app/models/Dtos/productModelCostDto';
import { InstallationCostService } from 'src/app/services/installationCostService/installation-cost.service';
import { LocationService } from 'src/app/services/locationService/location.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ProductModelCostDetailService } from 'src/app/services/productModelCostDetailService/product-model-cost-detail.service';
import { ProductModelCostService } from 'src/app/services/productModelCostService/product-model-cost.service';

@Component({
  selector: 'app-product-model-cost',
  templateUrl: './product-model-cost.component.html',
  styleUrls: ['./product-model-cost.component.scss']
})
export class ProductModelCostComponent implements OnInit {

  productModelCostDto:ProductModelCostDto;
  productModelCostDetailDto : ProductModelCostDetailDto
  productModelCostDetailDtoSelectList : ProductModelCostDetailSelectListDto[] = []
  installationCostDtoList : InstallationCostDto[] = []
  installationCost : InstallationCost
  modelId : number
  locationId:any = null
  installationCostId:any = null

  //Form Start
  _productModelCostDtoForm : FormGroup;
  _updateProductModelCostDtoForm : FormGroup;
  // Form End

  constructor(
    //Model Service  Start
    private productModelCostService : ProductModelCostService,
    private productModelCostDetailService : ProductModelCostDetailService,
    private installationCostService : InstallationCostService,
    //Model Service End
    private activatedRoute:ActivatedRoute,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private modalService : ModalService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["productModelCostId"]) {
        this.getProductModelCostDtoByModelId(params["productModelCostId"])
        this.getProductModelCostDetailDtoByProductModelCostId(params["productModelCostId"])
        this.modelId = params["productModelCostId"]
        this.getAllInstallationLocation()
        this.addProductModelCostDtoForm()
        this.updateProductModelCostDtoForm()
      }
    })
  }

  addProductModelCostDtoForm(){
    this._productModelCostDtoForm = this.formBuilder.group({
      modelId:[Number(this.modelId)],
      productModelCostOverheadPercentage:[17,Validators.required],
      installationCostLocationId:["",Validators.required],
      productModelCostLaborCostPerHour:[0,Validators.required],
      productModelCostDetailProfitPercentage:[0,Validators.required],
      productModelCostDetailTurkeySalesDiscount:[0,Validators.required],
      productModelCostDetailExportFinalDiscount:[0,Validators.required]
    })
  }

  updateProductModelCostDtoForm(){
    this._updateProductModelCostDtoForm = this.formBuilder.group({
      productModelCostDetailId:[0,Validators.required],
      modelId:[0],
      installationCostId:[0,Validators.required],
      productModelCostOverheadPercentage:[0,Validators.required],
      installationCostLocationId:[null,Validators.required],
      productModelCostLaborCostPerHour:["",Validators.required],
      productModelCostDetailProfitPercentage:[1,Validators.required],
      productModelCostDetailTurkeySalesDiscount:[1,Validators.required],
      productModelCostDetailExportFinalDiscount:[1,Validators.required]
    })
  }

  writeProductModelCostForm(){
    this._updateProductModelCostDtoForm.patchValue({
      productModelCostDetailId:this.productModelCostDetailDto.productModelCostDetailId, modelId:this.productModelCostDetailDto.productModelCostDetailProductModelCostId,
      installationCostId : this.productModelCostDetailDto.installationCostId, installationCostLocationId : this.productModelCostDetailDto.installationCostLocationId,
      productModelCostOverheadPercentage : this.productModelCostDto.productModelCostOverheadPercentage,
      productModelCostDetailProfitPercentage:this.productModelCostDetailDto.productModelCostDetailProfitPercentage,
      productModelCostDetailTurkeySalesDiscount: this.productModelCostDetailDto.productModelCostDetailTurkeySalesDiscount,
      productModelCostDetailExportFinalDiscount: this.productModelCostDetailDto.productModelCostDetailExportFinalDiscount
    })
  }

  getProductModelCostDtoByModelId(modelId : number){

    console.log("Byıd başladı")
    console.log("ById modelId kontrol", modelId)
    this.productModelCostService.getProductModelCostDtoByModelId(modelId).subscribe(response => {
      this.productModelCostDto = response.data
      console.log("Veri kontrol",this.productModelCostDto.productModelCostShateIronEuroPrice)
    })
  }

  getProductModelCostDetailDtoByLocationModelId(){
    console.log("Location ve model başladı")
    console.log("Location id ve model Id", this.locationId, this.modelId)
    this.productModelCostDetailService.getProductModelCostDtoByLocationModelId(this.locationId, this.modelId).subscribe(response => {
      this.productModelCostDetailDto = response.data
      this.updateProductModelCostDtoForm()
      this.writeProductModelCostForm()
    })
  }

  getProductModelCostDetailDtoByProductModelCostId(productModelCostId : number){
    this.productModelCostDetailService.getAllProductModelCostDtoByProductModelCostId(productModelCostId).subscribe(response => {
      this.productModelCostDetailDtoSelectList = response.data
      console.log(this.productModelCostDetailDtoSelectList)
    })
  }

  getAllInstallationLocation(){
    this.installationCostService.getAllInstallationCostDto().subscribe(response => {
      console.log(response.data)
      this.installationCostDtoList = response.data
    })
  }

  getInstallationCostById(){
    console.log("Arama başladı", this.installationCostId)
    if (this.installationCostId) {
      this.installationCostService.getInstallationCostByLocationId(this.installationCostId).subscribe(response => {
        this.installationCost = response.data
      })
    }
    
  }

  addProductModelCostDto(){
    console.log("Check add",this._productModelCostDtoForm.value)
    if(this._productModelCostDtoForm.valid){
      let productModelCostDto = Object.assign({}, this._productModelCostDtoForm.value)
      this.productModelCostService.addProductModelCostDto(productModelCostDto).pipe(
        catchError((err : HttpErrorResponse) => { 
          console.log("Hata",err.error)
          if(err.error.message != null && err.error.message != undefined && !err.error.Errors){
            console.log("Length 1")
            this.toastrService.error(err.error.message,"Hata")
          }
          else if (err.error.Errors.length > 0) {
            console.log("Array hatasına giriş yapıldı")
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
           
           return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message,"Başarılı")
          this.activatedRoute.params.subscribe(params => {
          this.getProductModelCostDtoByModelId(params["productModelCostId"])
          this.getProductModelCostDetailDtoByProductModelCostId(params["productModelCostId"])
          })
        })
    }
  }

  updateProductModelCostDto(){
    if (this._updateProductModelCostDtoForm.valid) {
      let productModelCostDto = Object.assign({}, this._updateProductModelCostDtoForm.value)
      this.productModelCostService.updateProductModelCostDto(productModelCostDto).pipe(
        catchError((err : HttpErrorResponse) => {
          console.log("update hatası",err)
          if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].errorMessage, "Doğrulama hatası")
            }
          }
           return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message,"Başarılı")
          this.activatedRoute.params.subscribe(params => {
          this.getProductModelCostDtoByModelId(params["productModelCostId"])
          this.getProductModelCostDetailDtoByProductModelCostId(params["productModelCostId"])
          })
        })
    }
  }

 

}
