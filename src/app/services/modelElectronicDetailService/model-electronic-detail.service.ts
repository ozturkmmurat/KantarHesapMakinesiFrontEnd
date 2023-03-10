import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Model } from 'src/app/models/model';
import { ModelElectronicDetail } from 'src/app/models/modelElectronicDetail';
import { ModelElectronicDetailDto } from 'src/app/models/Dtos/modelElectronicDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelElectronicDetailService {
  _electronicDetailForm: FormGroup;
  _addModelElectronicDetailFormm: FormGroup

  constructor(private httpClient: HttpClient,
  ) { }


  getAllModelElectronicDetailDtoByModelId(modelId: number): Observable<ListResponseModel<ModelElectronicDetailDto>> {
    let newPath = environment.apiUrl + "api/modelElectronicDetails/getAllModelElectronicDetailDtoByModelId?modelId=" + modelId
    return this.httpClient.get<ListResponseModel<ModelElectronicDetailDto>>(newPath)
  }

  add(modelElectronicDetail: ModelElectronicDetail): Observable<ResponseModel> {
    let newPath = environment.apiUrl + "api/modelElectronicDetails/add"
    return this.httpClient.post<ResponseModel>(newPath, modelElectronicDetail)
  }

  update(modelElectronicDetail: ModelElectronicDetail): Observable<ResponseModel> {
    console.log("Service update",modelElectronicDetail)
    let newPath = environment.apiUrl + "api/modelElectronicDetails/update"
    return this.httpClient.post<ResponseModel>(newPath, modelElectronicDetail)
  }

  delete(modelElectronicDetail: ModelElectronicDetail): Observable<ResponseModel> {
    console.log("Delete", modelElectronicDetail)
    let newPath = environment.apiUrl + "api/modelElectronicDetails/delete"
    return this.httpClient.post<ResponseModel>(newPath, modelElectronicDetail)
  }
}
