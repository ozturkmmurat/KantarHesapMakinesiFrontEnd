import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient : HttpClient) { }

  getAllProduct():Observable<ListResponseModel<Product>>{
    let newPath = environment.apiUrl + "api/products/GetAll";
    return this.httpclient.get<ListResponseModel<Product>>(newPath)
  }

  getAllProductDto():Observable<ListResponseModel<ProductDto>>{
    let newPath = environment.apiUrl + "api/products/GetAllDto";
    return this.httpclient.get<ListResponseModel<ProductDto>>(newPath)
  }

  add(product:Product):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/add";
    return this.httpclient.post<ResponseModel>(newPath, product)
  }

  update(product:Product):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/update"
    return this.httpclient.post<ResponseModel>(newPath, product)
  }

  delete(product:Product):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/delete"
    return this.httpclient.post<ResponseModel>(newPath, product)
  }
}
