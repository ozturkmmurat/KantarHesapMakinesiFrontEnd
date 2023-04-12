import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ProductModelCost } from 'src/app/models/ProductModelCost/productModelCost';
import { ProductModelCostDto } from 'src/app/models/Dtos/productModelCostDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductModelCostService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getProductModelCostDtoByModelId(modelId : number):Observable<SingleResponseModel<ProductModelCostDto>>{
    let newPath = environment.apiUrl + "api/productModelCosts/getProductModelCostDtoByModelId?modelId=" + modelId
    return this.httpClient.get<SingleResponseModel<ProductModelCostDto>>(newPath);
  }

  add(productModelCostDto : ProductModelCostDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/productModelCosts/addProductModelCost"
    return this.httpClient.post<ResponseModel>(newPath,productModelCostDto)
  }
  update(productModelCostDto : ProductModelCostDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/productModelCosts/updateProductModelCost"
    return this.httpClient.post<ResponseModel>(newPath,productModelCostDto)
  }

  delete(productModelCost : ProductModelCost):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/productModelCosts/delete"
    return this.httpClient.post<ResponseModel>(newPath,productModelCost)
  }
  
}
