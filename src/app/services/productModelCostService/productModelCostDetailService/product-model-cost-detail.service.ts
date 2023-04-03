import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ProductModelCostDetailDto } from 'src/app/models/Dtos/productModelCostDetailDto';
import { ProductModelCostDetailSelectListDto } from 'src/app/models/Dtos/productModelCostDetailSelectListDto';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { ProductModelCostDto } from 'src/app/models/Dtos/productModelCostDto';
import { ProductModelCostDetail } from 'src/app/models/ProductModelCost/productModelCostDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductModelCostDetailService {

  constructor(
    private httpClient : HttpClient
    ) { }


    getCalculate(modelId:number, installationCostLocationId:number, accessoryId:number):Observable<SingleResponseModel<ProductModelCostDetail>>{
      let newPath = environment.apiUrl + "api/productModelCostDetails/getCalculate?modelId="+ modelId +"&installationCostLocationId="+ installationCostLocationId +"&accessoryId="+ accessoryId
      return this.httpClient.get<SingleResponseModel<ProductModelCostDetail>>(newPath);
    }
}
