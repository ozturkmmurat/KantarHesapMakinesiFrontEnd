import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProductsCrudComponent } from 'src/app/pages/product-crud/products-crud.component';
import { ModelCrudComponent } from 'src/app/pages/model-crud/model-crud.component';
import { AccessoryCrudComponent } from 'src/app/pages/accessory-crud/accessory-crud.component';
import { ElectronicCrudComponent } from 'src/app/pages/electronic-crud/electronic-crud.component';
import { InstallationCostComponent } from 'src/app/pages/installation-cost/installation-cost.component';
import { ProductModelCostComponent } from 'src/app/pages/product-model-cost/product-model-cost.component';
import { CostVariableComponent } from 'src/app/pages/cost-variable/cost-variable.component';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { DataTableTestComponent } from 'src/app/pages/data-table-test/data-table-test.component';
import { UserListComponent } from 'src/app/pages/user-list/user-list.component';
import { SizeComponent } from 'src/app/pages/height-weight/size.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[LoginGuard], data: { roles: ['user', 'admin', 'official'] } },
    { path: 'userList',      component:UserListComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'products',           component: ProductsCrudComponent, canActivate:[LoginGuard], data: { roles: ['admin'] } },
    { path: 'models',           component: ModelCrudComponent, canActivate:[LoginGuard], data: { roles: ['admin'] } },
    { path: 'accessory',      component:AccessoryCrudComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'electronic',      component:ElectronicCrudComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'installationCost',      component:InstallationCostComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'costVariable',      component:CostVariableComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'models/productModelCost/:productModelCostId',      component:ProductModelCostComponent, canActivate:[LoginGuard], data: { roles: ['admin'] }},
    { path: 'heightWeight',           component: SizeComponent, canActivate:[LoginGuard], data: { roles: ['admin'] } },

];
