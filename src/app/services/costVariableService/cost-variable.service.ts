import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostVariable } from 'src/app/models/costVariable';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostVariableService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllCostVariable():Observable<ListResponseModel<CostVariable>>{
    let newPath = environment.apiUrl + "api/costVariables/getAll"
    return this.httpClient.get<ListResponseModel<CostVariable>>(newPath)
  }

  add(costVariable : CostVariable):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/costVariables/add?xValue=" + costVariable["xValue"] + "&yValue=" + costVariable["yValue"]
    return this.httpClient.post<ResponseModel>(newPath,costVariable)
  }

  update(costVariable : CostVariable):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/costVariables/update?xValue=" + costVariable["xValue"] + "&yValue=" + costVariable["yValue"]
    return this.httpClient.post<ResponseModel>(newPath,costVariable)
  }

  delete(costVariable : CostVariable):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/costVariables/delete"
    return this.httpClient.post<ResponseModel>(newPath,costVariable)
  }
}
