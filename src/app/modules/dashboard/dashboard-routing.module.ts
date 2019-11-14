import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "src/app/modules/dashboard/dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { CatalogProductsComponent } from "./catalog-products/catalog-products.component";
import { InitialComponent } from "./initial/initial.component";
import { QuotationsComponent } from "./quotations/quotations.component";
import { QuotationDetailComponent } from "./quotation-detail/quotation-detail.component";
import { InformationUserComponent } from './information-user/information-user.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "initial", component: InitialComponent },
      { path: "products", component: ProductsComponent },
      { path: "quotations", component: QuotationsComponent },
      { path: "quotation-detail", component: QuotationDetailComponent },
      { path: "catalog-products", component: CatalogProductsComponent },
      { path: "information-user", component: InformationUserComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
