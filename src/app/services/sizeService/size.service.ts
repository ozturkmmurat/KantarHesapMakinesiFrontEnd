import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { Size } from 'src/app/models/size';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllSize():Observable<ListResponseModel<Size>>{
    let newPath = environment.apiUrl + "api/sizes/GetAll"
    return this.httpClient.get<ListResponseModel<Size>>(newPath);
  }


  getById(id:number):Observable<SingleResponseModel<Size>>{
    let newPath = environment.apiUrl + "api/sizes/getById?id=" + id
    return this.httpClient.get<SingleResponseModel<Size>>(newPath)
  }

  add(heightWeight:Size):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/sizes/add"
    return this.httpClient.post<ResponseModel>(newPath,heightWeight)
  }

  update(heightWeight:Size):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/sizes/update"
    return this.httpClient.post<ResponseModel>(newPath,heightWeight)
  }

  delete(heightWeight:Size):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/sizes/delete"
    return this.httpClient.post<ResponseModel>(newPath,heightWeight)
  }
}
