import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ModelAccessoryDetail } from 'src/app/models/modelAccessoryDetail';
import { ModelAccessoryDetailDto } from 'src/app/models/Dtos/modelAccessoryDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelAccessoryDetailService {

  constructor(private httpClient : HttpClient) { }
  
  getAllModelAccessoryDetail():Observable<ListResponseModel<ModelAccessoryDetail>>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/GetAll"
    return this.httpClient.get<ListResponseModel<ModelAccessoryDetail>>(newPath);
  }

  getAllModelAccessoryDetailByModelId(modelId:number):Observable<ListResponseModel<ModelAccessoryDetailDto>>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/GetAllModelAccesoryDetailByModelId?modelId="+modelId
    return this.httpClient.get<ListResponseModel<ModelAccessoryDetailDto>>(newPath)
  }

  getModelAccesoryDetailDtoByModelId(modelId:number):Observable<SingleResponseModel<ModelAccessoryDetailDto>>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/getModelAccesoryDetailDtoByModelId?modelId=" + modelId
    return this.httpClient.get<SingleResponseModel<ModelAccessoryDetailDto>>(newPath)
  }

  add(modelAccessoryDetail:ModelAccessoryDetail):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/add"
    return this.httpClient.post<ResponseModel>(newPath,modelAccessoryDetail)
  }

  update(modelAccessoryDetail:ModelAccessoryDetail):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/update"
    return this.httpClient.post<ResponseModel>(newPath,modelAccessoryDetail)
  }

  delete(modelAccessoryDetail:ModelAccessoryDetail):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/modelAccessoryDetails/delete"
    return this.httpClient.post<ResponseModel>(newPath,modelAccessoryDetail)
  }
}
