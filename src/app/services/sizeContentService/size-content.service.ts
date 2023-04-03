import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeContentDto } from 'src/app/models/Dtos/sizeContentDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SizeContent } from 'src/app/models/sizeContent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeContentService {

  constructor(
    private httpClient : HttpClient
    ) { }

    getAllSizeCtDtoBySizeId(sizeId : number):Observable<ListResponseModel<SizeContentDto>>{
      let newPath = environment.apiUrl + "api/sizeContents/getAllSizeCtDtoBySizeId?sizeId=" + sizeId
      return this.httpClient.get<ListResponseModel<SizeContentDto>>(newPath);
    }

    add(sizeContent:SizeContent):Observable<ResponseModel>{
      console.log("installationCost geldi service" ,sizeContent)
      let newPath = environment.apiUrl + "api/sizeContents/add"
      return this.httpClient.post<ResponseModel>(newPath,sizeContent)
    }
  
    update(sizeContent:SizeContent):Observable<ResponseModel>{
      let newPath = environment.apiUrl + "api/sizeContents/update"
      return this.httpClient.post<ResponseModel>(newPath,sizeContent)
    }
  
    delete(sizeContent:SizeContent):Observable<ResponseModel>{
      let newPath = environment.apiUrl + "api/sizeContents/delete"
      return this.httpClient.post<ResponseModel>(newPath,sizeContent)
    }

}
