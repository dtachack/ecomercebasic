import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { InitialComponent } from "./initial/initial.component";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { SliderComponent } from "./slider/slider.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { CartComponent } from "./cart/cart.component";
import { FooterComponent } from "./footer/footer.component";
import { ProductComponent } from "./product/product.component";
import { RegisterModalComponent } from "./register-modal/register-modal.component";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    InitialComponent,
    NavBarComponent,
    SliderComponent,
    LoginModalComponent,
    CartComponent,
    FooterComponent,
    ProductComponent,
    RegisterModalComponent,
    RegisterComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  exports: [HomeComponent],
  entryComponents: [
    InitialComponent,
    NavBarComponent,
    SliderComponent,
    LoginModalComponent,
    RegisterModalComponent
  ]
})
export class HomeModule {}
