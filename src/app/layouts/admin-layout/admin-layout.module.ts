import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsCrudComponent } from 'src/app/pages/product-crud/products-crud.component';
import { ModelCrudComponent } from 'src/app/pages/model-crud/model-crud.component';
import { AccessoryCrudComponent } from 'src/app/pages/accessory-crud/accessory-crud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ElectronicCrudComponent } from 'src/app/pages/electronic-crud/electronic-crud.component';
import { AccessoryPackageCrudComponent } from 'src/app/pages/accessory-package-crud/accessory-package-crud.component';
import { BrowserModule } from '@angular/platform-browser';
import { PackageAccesoriesModalComponent } from 'src/app/pages/accessory-package-crud/package-accesories-modal/package-accesories-modal.component';
import { ModelElectronicDetailModalComponent } from 'src/app/pages/model-crud/model-electronic-detail-modal/model-electronic-detail-modal.component';
import { InstallationCostComponent } from 'src/app/pages/installation-cost/installation-cost.component';
import { ProductModelCostComponent } from 'src/app/pages/product-model-cost/product-model-cost.component';
import { CostVariableComponent } from 'src/app/pages/cost-variable/cost-variable.component';
import { AuthInterceptor } from 'src/app/interceptors/auth/auth.interceptor';
import { DataTableTestComponent } from 'src/app/pages/data-table-test/data-table-test.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterPipe } from 'src/app/pipes/filterPipe/filter.pipe';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        UserProfileComponent,
        TablesComponent,
        IconsComponent,
        MapsComponent,
        ProductsCrudComponent,
        ModelCrudComponent,
        AccessoryCrudComponent,
        ElectronicCrudComponent,
        AccessoryPackageCrudComponent,
        PackageAccesoriesModalComponent,
        ModelElectronicDetailModalComponent,
        InstallationCostComponent,
        ProductModelCostComponent,
        CostVariableComponent,
        DataTableTestComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxDatatableModule
    ],
    providers: [{
        provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
      }]
})

export class AdminLayoutModule {}
