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
import { ModelService } from 'src/app/services/modelService/model.service';

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
  _modelForm : FormGroup;
  // Form End

  constructor(
    //Service  Start
    private productModelCostService: ProductModelCostService,
    private productModelCostDetailService: ProductModelCostDetailService,
    private installationCostService: InstallationCostService,
    private accessoryService : AccessoryService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    //Service End
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["productModelCostId"]) {
        this.getProductModelCostDtoByModelIdCurrency(params["productModelCostId"])
        this.modelId = params["productModelCostId"]
        this.getAllInstallationLocation()
        this.getAllAccessory()
        this.addProductModelCostDtoForm()
        this.updateModelForm()
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
    })
  }

  updateModelForm(){
    this._modelForm = this.formBuilder.group({
      id: [Number(this.modelId)],
      profitPercentage: [0, Validators.required],
      additionalProfitPercentage : [0, Validators.required]
    })
  }

  writeProductModelCostForm() {
    this._modelForm.patchValue({
      profitPercentage:this.productModelCostDto.profitPercentage, additionalProfitPercentage: this.productModelCostDto.additionalProfitPercentage
    })
  }

  getProductModelCostDtoByModelIdCurrency(modelId: number) {
    this.productModelCostService.getProductModelCostDtoByModelIdCurrency(modelId, "EUR").subscribe(response => {
      this.productModelCostDto = response.data
      this.writeProductModelCostForm()
    })
  }

  getCalculate() {
    if(this.exportationstate == false){
      const productModelCostDetail: any =  {
        modelId:this.modelId, installationCostLocationId:0, accessoryId:0, exportState:false, currencyName:"EUR"
      }
      this.productModelCostDetailService.getCalculate(productModelCostDetail).subscribe(response => {
        this.productModelCostDetail = response.data
      })

    }
    else{
      const productModelCostDetail: any =  {
        modelId:this.modelId, installationCostLocationId:this.installationCostLocationId, accessoryId:this.accessoryId, exportState:true, currencyName:"TRY"
      }
      this.productModelCostDetailService.getCalculate(productModelCostDetail).subscribe(response => {
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

  refreshProductModelCostDto(){
    this.productModelCostService.getProductModelCostDtoByModelIdCurrency(this.modelId, "TRY")
    .subscribe(response => {
      let productModelCost: ProductModelCostDto ={
        modelId:response.data.modelId,
        profitPercentage:response.data.profitPercentage,
        additionalProfitPercentage:response.data.additionalProfitPercentage
      }
      this.productModelCostService.update(productModelCost).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.activatedRoute.params.subscribe(params => {
            this.getProductModelCostDtoByModelIdCurrency(params["productModelCostId"])
          })
        })
    })
    
  }

}
