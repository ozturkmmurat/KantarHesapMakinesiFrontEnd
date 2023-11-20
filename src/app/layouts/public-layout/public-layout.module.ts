import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicLayoutRoutes } from './public-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalculateOfferComponent } from 'src/app/pages/calculate-offer/calculate-offer.component';
import { SharedModule } from 'src/shared.module';
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
    SharedModule
  ],
  declarations: [
    CalculateOfferComponent
  ]
})
export class PublicLayotuModule{ }
