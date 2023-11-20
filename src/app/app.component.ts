import { Component } from '@angular/core';
import { IpService } from './services/ipService/ip.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './services/errorService/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KantarHesapMakinesiFrontend';


  allowedIps = ["212.156.50.182", "88.249.1.198", "95.9.250.14", "213.14.164.200", "188.59.171.1"];
  userIp : any;

  constructor(
    private ipService : IpService,
    private errorService :ErrorService
  ) { 
  }

  ngOnInit(): void {
   this.checkIpAddress()
  }

   checkIpAddress(){
    this.ipService.getMyIp().pipe(
      catchError((err : HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        if (!this.allowedIps.includes(response.ipString)) {
          alert('Bu sayfaya erişim izniniz yok.');
           window.location.href = 'http://www.example.com/';
        }
      })
  }

}