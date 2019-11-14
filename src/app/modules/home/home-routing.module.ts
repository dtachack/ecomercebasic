import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CartComponent } from "src/app/modules/home/cart/cart.component";
import { ProductComponent } from "./product/product.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "cart", component: CartComponent },
  { path: "register", component: RegisterComponent },
  { path: "", component: HomeComponent },
  {
    path: "product/:ProductId",
    component: ProductComponent
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
