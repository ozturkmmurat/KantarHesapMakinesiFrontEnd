import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private localStorageService:LocalStorageService,private toastrService:ToastrService, private router:Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.localStorageService.isAuthenticated()) {
        return true;
      }else{
      this.router.navigate(["login"])
      this.toastrService.info("Sisteme giriş yapmalısınız.")
      return true;
      }
    }
  }
  

