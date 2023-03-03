import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Electronic } from 'src/app/models/electronic';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {

  constructor(private httpClient : HttpClient) { }

  getAllElectronic():Observable<ListResponseModel<Electronic>>{
    let newPath = environment.apiUrl + "api/electronics/getAll";
    return this.httpClient.get<ListResponseModel<Electronic>>(newPath);
  }

  add(electronic:Electronic):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/electronics/add"
    return this.httpClient.post<ResponseModel>(newPath,electronic)
  }

  update(electronic:Electronic):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/electronics/update"
    return this.httpClient.post<ResponseModel>(newPath,electronic)
  }

  delete(electronic:Electronic):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/electronics/delete"
    return this.httpClient.post<ResponseModel>(newPath,electronic)
  }
}
