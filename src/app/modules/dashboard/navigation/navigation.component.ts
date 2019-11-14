import { Component, OnInit } from "@angular/core";
import { Menu } from "src/app/shared/models/menu";
import { Router } from "@angular/router";
import { ClientType } from "src/app/shared/enums/client-type";
import { StorageService } from "src/app/shared/services/storage.service";
import { NAME_STORAGE_TYPE_USER } from "src/app/shared/const/globals";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  public menu: Menu[] = [];
  public clientType: ClientType;
  constructor(private storageService: StorageService, private router: Router) {
    this.getClientType();
    this.menu.push(
      new Menu(
        "Inicio",
        "/dashboard/initial",
        "fas fa-chart-bar"
      )
    );
    
    if (this.clientType == ClientType.client) {
      this.menu.push(
        new Menu(
          "Cotizaciones",
          "/dashboard/quotations",
          "fas fa-cart-arrow-down"
        )
      );
      // this.menu.push(
      //   new Menu("Productos", "/dashboard/products", "fas fa-blender-phone")
      // );
    } else if (this.clientType == ClientType.provider) {
      this.menu.push(
        new Menu(
          "Catalogo de Productos",
          "/dashboard/catalog-products",
          "fas fa-blender-phone"
        )
      );
    }

    this.menu.push(
      new Menu(
        "Mi información",
        "/dashboard/information-user",
        "fas fa-user"
      )
    );
  }

  ngOnInit() {}

  /**
   * Obtiene el tipo de cliente de la sesión
   */
  getClientType() {
    this.storageService.select(NAME_STORAGE_TYPE_USER).subscribe(type => {
      this.clientType = type != null ? type : ClientType.client;
    });
  }

  /**
   * Valida si es el componente actualmente activo
   */
  isComponentActive(menu: Menu) {
    return menu.url === this.router.url ? true : false;
  }
}
