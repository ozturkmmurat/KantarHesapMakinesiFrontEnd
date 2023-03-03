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
    let newPath = environment.apiUrl + "api/models/GetAll";
    return this.httpClient.get<ListResponseModel<Model>>(newPath)
  }

  getAllModelDto():Observable<ListResponseModel<ModelDto>>{
    let newPath = environment.apiUrl + "api/models/GetAllDto"
    return this.httpClient.get<ListResponseModel<ModelDto>>(newPath)
  }

  add(model:ModelDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/add";
    return this.httpClient.post<ResponseModel>(newPath, model)
  }

  update(model:ModelDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/update";
    return this.httpClient.post<ResponseModel>(newPath, model)
  }

  delete(model:Model):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/models/delete";
    return this.httpClient.post<ResponseModel>(newPath, model)
  }
}
