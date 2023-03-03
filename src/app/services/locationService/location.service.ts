import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Location } from 'src/app/models/location';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location : Location
  constructor(private httpClient : HttpClient) { }

  getAllLocation():Observable<ListResponseModel<Location>>{
    let newPath = environment.apiUrl + "api/locations/getAll"
    return this.httpClient.get<ListResponseModel<Location>>(newPath);
  }
}
