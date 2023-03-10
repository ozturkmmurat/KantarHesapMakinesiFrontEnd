import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
import { UserDto } from 'src/app/models/Dtos/userDto';
import { UserForUpdateDto } from 'src/app/models/Dtos/userForUpdateDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private httpclient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  _currentUser$ = new BehaviorSubject<User>(null);

  get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  get currentUser(): User {
    return this._currentUser$.value;
  }

  getAllUserDto(){
    let newPath = environment.apiUrl + "api/users/getAllUserDto"
    return this.httpclient.get<ListResponseModel<UserDto>>(newPath)
  }

  getByUserId(id:number):Observable<SingleResponseModel<UserForUpdateDto>>{
      let newPath = environment.apiUrl  + "api/users/getById?id=" + id;
      return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }

  
  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(environment.apiUrl + "api/users/update", userForUpdateDto)
  }

  updateUser(userDto : UserDto):Observable<ResponseModel>{
    console.log("Userdto service", userDto)
    return this.httpclient.post<ResponseModel>(environment.apiUrl + "api/users/updateUser", userDto)
  }

   setCurrentUser(): void {
    var url = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/"
    console.log("SetCurrentUser Start")
    console.log(this.getUserId(url,"nameidentifier"))
        this.getByUserId(this.getUserId(url, "nameidentifier")).pipe(
          catchError((err:HttpErrorResponse) => {
            console.log("Set Current User Hatası", err)
            return EMPTY
          }))
          .subscribe(response => {
            console.log("Set Current User Response", response.data)
            let user = {
              id: response.data.id,
              email: response.data.email,
              firstName: response.data.firstName,
              lastName: response.data.lastName
            }
            this._currentUser$.next(user)
          })
   
  }


  getUserId(url:string, data : string) {
    if(this.localStorageService.getToken() != null)
    return this.jwtHelper.decodeToken(this.localStorageService.getToken())[url+data];
  }

  
}
