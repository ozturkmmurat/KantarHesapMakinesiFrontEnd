import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/operationClaim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getAllOperationClaim():Observable<ListResponseModel<OperationClaim>>{
    let newPath = environment.apiUrl + "api/operationClaims/getAll"
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath)
  }
}
