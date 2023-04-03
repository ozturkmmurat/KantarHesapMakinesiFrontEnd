import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { CalculateOfferComponent } from 'src/app/pages/calculate-offer/calculate-offer.component';

export const PublicLayoutRoutes: Routes = [
    { path: 'calculateOffer',          component: CalculateOfferComponent },
];

