import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ProductModelCostDetailDto } from 'src/app/models/Dtos/productModelCostDetailDto';
import { ProductModelCostDetailSelectListDto } from 'src/app/models/Dtos/productModelCostDetailSelectListDto';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductModelCostDetailService {

  constructor(
    private httpClient : HttpClient
    ) { }


    getProductModelCostDtoByLocationModelId(locationId : number, modelId):Observable<SingleResponseModel<ProductModelCostDetailDto>>{
      let newPath = environment.apiUrl + "api/productModelCostDetails/GetProductModelCostDetailLocationModelId?locationId=" + locationId + "&modelId=" + modelId
      return this.httpClient.get<SingleResponseModel<ProductModelCostDetailDto>>(newPath);
    }
    
    getAllProductModelCostDtoByProductModelCostId(productModelCostId : number) : Observable<ListResponseModel<ProductModelCostDetailSelectListDto>>{
      let newPath = environment.apiUrl + "api/productModelCostDetails/getAllProductModelCostDetailDtoByProductModelCostId?productModelCostId=" + productModelCostId
      return this.httpClient.get<ListResponseModel<ProductModelCostDetailSelectListDto>>(newPath);
    }
}
