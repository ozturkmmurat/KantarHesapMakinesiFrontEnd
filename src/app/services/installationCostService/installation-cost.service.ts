import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstallationCost } from 'src/app/models/installationCost';
import { InstallationCostDto } from 'src/app/models/Dtos/installationCostDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallationCostService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllInstallationCostDto():Observable<ListResponseModel<InstallationCostDto>>{
    let newPath = environment.apiUrl + "api/installationCosts/GetAllInstallationCostDto"
    return this.httpClient.get<ListResponseModel<InstallationCostDto>>(newPath);
  }

  getInstallationCostByLocationId(locationId:number):Observable<SingleResponseModel<InstallationCost>>{ 
    let newPath = environment.apiUrl + "api/installationCosts/getInstallationCostByLocationId?locationId=" + locationId
    return this.httpClient.get<SingleResponseModel<InstallationCost>>(newPath)
  }

  add(installationCost:InstallationCost):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/installationCosts/add"
    return this.httpClient.post<ResponseModel>(newPath,installationCost)
  }

  update(installationCost:InstallationCost):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/installationCosts/update"
    return this.httpClient.post<ResponseModel>(newPath,installationCost)
  }

  delete(installationCost:InstallationCost):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/installationCosts/delete"
    return this.httpClient.post<ResponseModel>(newPath,installationCost)
  }
}
