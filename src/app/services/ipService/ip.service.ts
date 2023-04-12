import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private httpClient:HttpClient) { }

  getMyIp(): Observable<any>{
    return this.httpClient.get("https://api.bigdatacloud.net/data/client-ip")
  }
}
