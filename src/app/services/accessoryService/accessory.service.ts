import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Accessory } from 'src/app/models/accessory';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private httpClient : HttpClient) { }

  getAllAccessory():Observable<ListResponseModel<Accessory>>{
    let newPath = environment.apiUrl + "api/accessories/GetAll";
    return this.httpClient.get<ListResponseModel<Accessory>>(newPath);
  }

  getById(id:number):Observable<SingleResponseModel<Accessory>>{
    let newPath = environment.apiUrl + "api/accessories/GetById"+id;
    return this.httpClient.get<SingleResponseModel<Accessory>>(newPath)
  }

  getByName(name:string):Observable<SingleResponseModel<Accessory>>{
    console.log(name)
    let newPath = environment.apiUrl + "api/accessories/GetByName?name="+name;
    console.log(newPath)
    return this.httpClient.get<SingleResponseModel<Accessory>>(newPath)
  }

  add(accessory:Accessory):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/accessories/add"
    return this.httpClient.post<ResponseModel>(newPath,accessory)
  }

  update(accessory:Accessory):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/accessories/update"
    return this.httpClient.post<ResponseModel>(newPath,accessory)
  }

  delete(accessory:Accessory):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/accessories/delete"
    return this.httpClient.post<ResponseModel>(newPath,accessory)
  }
}
