import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  getAllCategory():Observable<ListResponseModel<Category>>{
    let newPath = environment.apiUrl + "api/categories/GetAll"
    return this.httpClient.get<ListResponseModel<Category>>(newPath)
  }
}
