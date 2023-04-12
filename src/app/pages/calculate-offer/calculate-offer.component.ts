import { Component, OnInit } from '@angular/core';
import { Accessory } from 'src/app/models/accessory';
import { InstallationCostDto } from 'src/app/models/Dtos/installationCostDto';
import { Model } from 'src/app/models/model';
import { Product } from 'src/app/models/product';
import { ProductModelCostDetail } from 'src/app/models/ProductModelCost/productModelCostDetail';
import { AccessoryService } from 'src/app/services/accessoryService/accessory.service';
import { InstallationCostService } from 'src/app/services/installationCostService/installation-cost.service';
import { ModelService } from 'src/app/services/modelService/model.service';
import { ProductModelCostDetailService } from 'src/app/services/productModelCostService/productModelCostDetailService/product-model-cost-detail.service';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-calculate-offer',
  templateUrl: './calculate-offer.component.html',
  styleUrls: ['./calculate-offer.component.scss']
})
export class CalculateOfferComponent implements OnInit {

  productList : Product[] = []
  modelList : Model[] = []
  installationCostDtoList : InstallationCostDto[] = [];
  accessoryList : Accessory[] = [];
  productModelCostDetail : ProductModelCostDetail

  //NgModel Variable Start
  accessoryId:number = 0
  productId:number = 0
  modelId:number = 0
  installationCostLocationId:number =0
  additionalProfitPercentage:number =0
  //NgModel Variable End

  exportationState:boolean
  turkeyHtmlState:boolean


  constructor(
    private productService : ProductService,
    private modelService : ModelService,
    private productModelCostDetailService : ProductModelCostDetailService,
    private installationCostService : InstallationCostService,
    private accessoryService : AccessoryService
  ) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.getAllInstallationLocation();
    this.getAllAccessory()
  }

  exportationStatus(exportationState:boolean){
    this.exportationState = exportationState
    this.turkeyHtmlState = false
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe(response => {
      this.productList = response.data
    })
  }

  getAllModelProductId(){
    this.modelService.getAllModelByProductId(this.productId).subscribe(response => {
      this.modelList = response.data
    })
  }

  getAllInstallationLocation() {
    this.installationCostService.getAllInstallationCostDto().subscribe(response => {
      this.installationCostDtoList = response.data
    })
  }

  getAllAccessory(){
    this.accessoryService.getAllAccessory().subscribe(response => {
      this.accessoryList = response.data
    })
  }

  getCalculate() {
    if(this.exportationState == false){
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

}
