import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { CalculateOfferComponent } from 'src/app/pages/calculate-offer/calculate-offer.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent , canActivate:[AuthGuard]},
    { path: 'register',       component: RegisterComponent, canActivate:[AuthGuard]}
];

