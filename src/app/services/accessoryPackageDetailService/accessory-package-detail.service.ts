import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Accessory } from 'src/app/models/accessory';
import { AccessoryPackage } from 'src/app/models/accessoryPackage';
import { AccessoryPackageDetail } from 'src/app/models/accessoryPackageDetail';
import { AccessoryPackageDetailDto } from 'src/app/models/Dtos/accessoryPackageDetailDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modalService/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AccessoryPackageDetailService {

  _accessoryPackageDetailForm: FormGroup;

  constructor(private httpClient: HttpClient,
  ) {
  }

  get accessoryPackageDetailFormArray() {
    return (this._accessoryPackageDetailForm.get('accessoryPackageDetailArray') as FormArray).controls
  }

  getAllAccessoryPackageDetail(): Observable<ListResponseModel<AccessoryPackageDetail>> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/GetAll";
    return this.httpClient.get<ListResponseModel<AccessoryPackageDetail>>(newPath)
  }

  getAllAccessoryPackageDetailDto(): Observable<ListResponseModel<AccessoryPackageDetailDto>> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/GetAllAccesoryPackageDto";
    return this.httpClient.get<ListResponseModel<AccessoryPackageDetailDto>>(newPath)
  }

  getAllAccessoryPackageDetailDtoById(id: number): Observable<ListResponseModel<AccessoryPackageDetailDto>> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/GetAllAccesoryPackageDtoById?id=" + id
    return this.httpClient.get<ListResponseModel<AccessoryPackageDetailDto>>(newPath)
  }

  getAccesoryPackageDtoById(id: number): Observable<SingleResponseModel<AccessoryPackageDetailDto>> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/GetAccesoryPackageDtoById?id=" + id
    return this.httpClient.get<SingleResponseModel<AccessoryPackageDetailDto>>(newPath)
  }

  add(accesoryPackageDetails: AccessoryPackageDetail): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/add"
    return this.httpClient.post<ResponseModel>(newPath, accesoryPackageDetails)
  }

  update(accesoryPackageDetails: AccessoryPackageDetail): Observable<ResponseModel> {
    console.log(accesoryPackageDetails)
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/update"
    console.log(newPath)
    return this.httpClient.post<ResponseModel>(newPath, accesoryPackageDetails)
  }

  delete(accesoryPackageDetails: AccessoryPackageDetail): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "api/accessoryPackageDetails/delete"
    return this.httpClient.post<ResponseModel>(newPath, accesoryPackageDetails)
  }
}
