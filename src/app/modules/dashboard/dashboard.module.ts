import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ProductsComponent } from "./products/products.component";
import { DataTablesModule } from "angular-datatables";
import { CatalogProductsComponent } from "./catalog-products/catalog-products.component";
import { SharedModule } from "src/app/shared/shared.module";
import { InitialComponent } from "./initial/initial.component";
import { ChartsModule } from "ng2-charts";
import { QuotationsComponent } from "./quotations/quotations.component";
import { QuotationDetailComponent } from "./quotation-detail/quotation-detail.component";
import { QuotationOffertsComponent } from "./quotation-offerts/quotation-offerts.component";
import { InformationUserComponent } from './information-user/information-user.component';
@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    NavBarComponent,
    ProductsComponent,
    CatalogProductsComponent,
    InitialComponent,
    QuotationsComponent,
    QuotationDetailComponent,
    QuotationOffertsComponent,
    InformationUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    DataTablesModule,
    ChartsModule
  ],
  entryComponents: [QuotationOffertsComponent]
})
export class DashboardModule {}
