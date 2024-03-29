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
import { BrowserModule } from '@angular/platform-browser';
import { InstallationCostComponent } from 'src/app/pages/installation-cost/installation-cost.component';
import { ProductModelCostComponent } from 'src/app/pages/product-model-cost/product-model-cost.component';
import { CostVariableComponent } from 'src/app/pages/cost-variable/cost-variable.component';
import { AuthInterceptor } from 'src/app/interceptors/auth/auth.interceptor';
import { DataTableTestComponent } from 'src/app/pages/data-table-test/data-table-test.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterPipe } from 'src/app/pipes/filterPipe/filter.pipe';
import { UserListComponent } from 'src/app/pages/user-list/user-list.component';
import { SizeComponent } from 'src/app/pages/height-weight/size.component';
import { SizeContentModalComponent } from 'src/app/pages/height-weight/size-content-modal/size-content-modal.component';
import { SharedModule } from 'src/shared.module';

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
        InstallationCostComponent,
        ProductModelCostComponent,
        CostVariableComponent,
        DataTableTestComponent,
        FilterPipe,
        UserListComponent,
        SizeComponent,
        SizeContentModalComponent,
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
        NgxDatatableModule,
        SharedModule
    ],
    providers: [{
        provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
      }]
})

export class AdminLayoutModule {}
