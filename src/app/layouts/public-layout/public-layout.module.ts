import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicLayoutRoutes } from './public-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalculateOfferComponent } from 'src/app/pages/calculate-offer/calculate-offer.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    CalculateOfferComponent
  ]
})
export class PublicLayotuModule{ }
