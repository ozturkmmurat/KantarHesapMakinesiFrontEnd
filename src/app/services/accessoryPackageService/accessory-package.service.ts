import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessoryPackage } from 'src/app/models/accessoryPackage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessoryPackageService {

  accessoryPackageList:AccessoryPackage[] = [];
  constructor(
    private httpCleint: HttpClient) { }


  getAllAccessoryPackage():Observable<ListResponseModel<AccessoryPackage>>{
    let newPath = environment.apiUrl + "api/AccessoryPackages/GetAll";
    return this.httpCleint.get<ListResponseModel<AccessoryPackage>>(newPath);
  }

  add(accessoryPackage:AccessoryPackage):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/AccessoryPackages/add"
    return this.httpCleint.post<ResponseModel>(newPath,accessoryPackage)
  }

  update(accessoryPackage:AccessoryPackage):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/AccessoryPackages/update"
    return this.httpCleint.post<ResponseModel>(newPath,accessoryPackage)
  }

  delete(accessoryPackage:AccessoryPackage):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/AccessoryPackages/delete"
    return this.httpCleint.post<ResponseModel>(newPath,accessoryPackage)
  }
}
