import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/Dtos/productDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { environment } from 'src/environments/environment';
import { CRUDProductDto } from 'src/app/models/Dtos/crudProductDto';

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
    let newPath = environment.apiUrl + "api/products/getAllDto";
    return this.httpclient.get<ListResponseModel<ProductDto>>(newPath)
  }

  tsaAdd(crudPorductDto:CRUDProductDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/tsaAdd";
    return this.httpclient.post<ResponseModel>(newPath, crudPorductDto)
  }

  tsaUpdate(crudPorductDto:CRUDProductDto):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/tsaUpdate"
    return this.httpclient.post<ResponseModel>(newPath, crudPorductDto)
  }

  delete(product:Product):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "api/products/delete"
    return this.httpclient.post<ResponseModel>(newPath, product)
  }
}
