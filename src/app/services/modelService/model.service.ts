import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Model } from 'src/app/models/model';
import { ModelDto } from 'src/app/models/modelDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private httpClient : HttpClient) { }

  getAllModel():Observable<ListResponseModel<Model>>{
    let newPath = environment.apiUrl + "api/models/getAll";
    return this.httpClient.get<ListResponseModel<Model>>(newPath)
  }

  getAllModelByProductId(productId:number):Observable<ListResponseModel<Model>>{
    let newPath = environment.apiUrl + "api/models/getAllByProductId?productId="+ productId
    return this.httpClient.get<ListResponseModel<Model>>(newPath)
  }

  getAllModelDto():Observable<ListResponseModel<ModelDto>>{
    let newPath = environment.apiUrl + "api/models/getAllDto"
    return this.httpClient.get<ListResponseModel<ModelDto>>(newPath)
  }

  addDto(modelDto:ModelDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/addDto";
    return this.httpClient.post<ResponseModel>(newPath, modelDto)
  }

  updateDto(modelDto:ModelDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/updateDto";
    return this.httpClient.post<ResponseModel>(newPath, modelDto)
  }

  update(model:Model):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/update";
    return this.httpClient.post<ResponseModel>(newPath, model)
  }

  delete(model:Model):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/delete";
    return this.httpClient.post<ResponseModel>(newPath, model)
  }
}
