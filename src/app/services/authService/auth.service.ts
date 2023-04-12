import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserForLoginDto } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentTokenUser$ = new BehaviorSubject<User>(null);
  user: User
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;


  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  /**
   * Kullanıcıyı rxjs stream olarak getirir
   */
  get currentTokenUser$(): Observable<User> {
    return this._currentTokenUser$.asObservable();
  }

  /**
   * Kullanıcının çağırıldığı anda ki değerini getirir
   */
  get currentUser(): User {
    return this._currentTokenUser$.value;
  }

  private setTokenCurrentUser(): void {
    let token = this.decodeToken(this.localStorageService.getToken());
    if (token != null) {
      let user = {
        id: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: token.email,
        status: Boolean(token.status),
        firstName: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"]

      };
      this._currentTokenUser$.next(user);
    }
  }

  logOut() {
    this.localStorageService.signOut();
    this.router.navigate(["/login"]);
  }

  refreshTokenLogin(tokenModel: string) {
    let newPath = environment.apiUrl + "api/auth/refreshTokenLogin?refreshToken=" + tokenModel
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, null)
  }

  login(loginModel: UserForLoginDto) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "api/auth/login", loginModel)
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "api/auth/register", registerModel)
  }


  decodeToken(token: string) {
    if(token !=null){
      return this.jwtHelper.decodeToken(token);
    }
  }
}
