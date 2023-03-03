import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
import { UserForUpdateDto } from 'src/app/models/Dtos/userForUpdateDto';
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

  getByUserId(id:number):Observable<SingleResponseModel<UserForUpdateDto>>{
      let newPath = environment.apiUrl  + "api/users/getById?id=" + id;
      return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }

  
  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    console.log(typeof(userForUpdateDto))
    console.log("service",userForUpdateDto)
    return this.httpclient.post<ResponseModel>("https://localhost:5001/api/users/update",  userForUpdateDto)
  }


   setCurrentUser(): void {
    setTimeout(() => {
      var result = this.getUserId()
      if(result !=0 &&  result != null){
        this.getByUserId(this.getUserId()).pipe(
          catchError((err:HttpErrorResponse) => {
            console.log("Set Current User Hatası", err)
            return EMPTY
          }))
          .subscribe(response => {
            console.log("Response", response.data)
            let user = {
              id: response.data.id,
              email: response.data.email,
              firstName: response.data.firstName,
              lastName: response.data.lastName
            }
            this._currentUser$.next(user)
          })
      }
    }, 2000);
   
  }


  getUserId() {
    if(this.localStorageService.getToken() != null)
    return this.jwtHelper.decodeToken(this.localStorageService.getToken())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}
