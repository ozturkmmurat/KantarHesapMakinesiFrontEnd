import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { CalculateOfferComponent } from './pages/calculate-offer/calculate-offer.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PublicLayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
  })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
