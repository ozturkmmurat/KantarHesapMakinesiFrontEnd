import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, of } from 'rxjs';
import { InstallationCost } from 'src/app/models/installationCost';
import { InstallationCostDto } from 'src/app/models/Dtos/installationCostDto';
import { Location } from 'src/app/models/location';
import { ProductModelCost } from 'src/app/models/ProductModelCost/productModelCost';
import { ProductModelCostDetailDto } from 'src/app/models/Dtos/productModelCostDetailDto';
import { ProductModelCostDetailSelectListDto } from 'src/app/models/Dtos/productModelCostDetailSelectListDto';
import { ProductModelCostDto } from 'src/app/models/Dtos/productModelCostDto';
import { InstallationCostService } from 'src/app/services/installationCostService/installation-cost.service';
import { LocationService } from 'src/app/services/locationService/location.service';
import { ModalService } from 'src/app/services/modalService/modal.service';
import { ProductModelCostService } from 'src/app/services/productModelCostService/product-model-cost.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { ProductModelCostDetailService } from 'src/app/services/productModelCostService/productModelCostDetailService/product-model-cost-detail.service';
import { id } from '@swimlane/ngx-datatable';
import { ProductModelCostDetail } from 'src/app/models/ProductModelCost/productModelCostDetail';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { Accessory } from 'src/app/models/accessory';

@Component({
  selector: 'app-product-model-cost',
  templateUrl: './product-model-cost.component.html',
  styleUrls: ['./product-model-cost.component.scss']
})
export class ProductModelCostComponent implements OnInit {

  //Model Start
  productModelCostDto: ProductModelCostDto;
  productModelCostDetailDto: ProductModelCostDetailDto
  productModelCostDetail : ProductModelCostDetail;
  productModelCostDetailDtoSelectList: ProductModelCostDetailSelectListDto[] = []
  installationCostDtoList: InstallationCostDto[] = []
  installationCost: InstallationCost
  accessoryList : Accessory[] = []
  //Model End

  //NgModel Variable Start
  modelId: number
  accessoryId:any = null
  locationId: any = null
  installationCostLocationId: any = null
  //NgModel Variable Start
 

  //Visibility State Start
  exportationstate: boolean
  turkeyHtmlState : boolean
  //Visibility State End

  //Form Start
  _productModelCostDtoForm: FormGroup;
  // Form End

  constructor(
    //Service  Start
    private productModelCostService: ProductModelCostService,
    private productModelCostDetailService: ProductModelCostDetailService,
    private installationCostService: InstallationCostService,
    private accessoryService : AccessoryService,
    private modalService: ModalService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    //Service End
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["productModelCostId"]) {
        this.getProductModelCostDtoByModelId(params["productModelCostId"])
        this.modelId = params["productModelCostId"]
        this.getAllInstallationLocation()
        this.getAllAccessory()
        this.addProductModelCostDtoForm()
      }
    })
  }

  exportationStatus(exportationstate:boolean){
    this.exportationstate = exportationstate
    this.turkeyHtmlState = false
  }

  addProductModelCostDtoForm() {
    this._productModelCostDtoForm = this.formBuilder.group({
      modelId: [Number(this.modelId)],
      productModelCostProfitPercentage: [0, Validators.required],
      productModelCostAdditionalProfitPercentage : [0, Validators.required]
    })
  }

  writeProductModelCostForm() {
    this._productModelCostDtoForm.patchValue({
      productModelCostProfitPercentage:this.productModelCostDto.productModelCostProfitPercentage, productModelCostAdditionalProfitPercentage: this.productModelCostDto.productModelCostAdditionalProfitPercentage
    })
  }

  getProductModelCostDtoByModelId(modelId: number) {
    this.productModelCostService.getProductModelCostDtoByModelId(modelId).subscribe(response => {
      this.productModelCostDto = response.data
      this.writeProductModelCostForm()
    })
  }

  getCalculate() {
    if(this.exportationstate == false){
      this.productModelCostDetailService.getCalculate(this.modelId, 0, 0).subscribe(response => {
        this.productModelCostDetail = response.data
      })

    }
    else{
      this.productModelCostDetailService.getCalculate(this.modelId, this.installationCostLocationId, this.accessoryId).subscribe(response => {
        
        this.turkeyHtmlState = true
        this.productModelCostDetail = response.data
      })
    }
  }

  getAllInstallationLocation() {
    this.installationCostService.getAllInstallationCostDto().subscribe(response => {
      this.installationCostDtoList = response.data
    })
  }

  getInstallationCostById() {
    if (this.installationCostLocationId) {
      this.installationCostService.getInstallationCostByLocationId(this.installationCostLocationId).subscribe(response => {
        this.installationCost = response.data
      })
    }

  }

  getAllAccessory(){
    this.accessoryService.getAllAccessory().subscribe(response => {
      this.accessoryList = response.data
    })
  }

  addProductModelCostDto() {
    if (this._productModelCostDtoForm.valid) {
      let productModelCostDto = Object.assign({}, this._productModelCostDtoForm.value)
      this.productModelCostService.add(productModelCostDto).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.activatedRoute.params.subscribe(params => {
            this.getProductModelCostDtoByModelId(params["productModelCostId"])
          })
        })
    }
  }

  updateProductModelCostDto() {
    if (this._productModelCostDtoForm.valid) {
      let productModelCostDto = Object.assign({}, this._productModelCostDtoForm.value)
      this.productModelCostService.update(productModelCostDto).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.activatedRoute.params.subscribe(params => {
            this.getProductModelCostDtoByModelId(params["productModelCostId"])
          })
        })
    }
  }

  refreshProductModelCostDto(){
    this.productModelCostService.getProductModelCostDtoByModelId(this.modelId)
    .subscribe(response => {
      let productModelCost: ProductModelCostDto ={
        modelId:response.data.modelId,
        productModelCostProfitPercentage:response.data.productModelCostProfitPercentage,
        productModelCostAdditionalProfitPercentage:response.data.productModelCostAdditionalProfitPercentage
      }
      this.productModelCostService.update(productModelCost).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.activatedRoute.params.subscribe(params => {
            this.getProductModelCostDtoByModelId(params["productModelCostId"])
          })
        })
    })
    
  }

}
