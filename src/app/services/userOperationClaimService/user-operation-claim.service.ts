import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(
    private httpClient : HttpClient
  ) { }

  update(userOperationClaim : UserOperationClaim):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "api/userOperationClaim", userOperationClaim)
  }
}
