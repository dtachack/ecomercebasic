import { Component, OnInit } from "@angular/core";
import { LoginModalComponent } from "../login-modal/login-modal.component";
import { MatDialog } from "@angular/material";
import { StorageService } from "src/app/shared/services/storage.service";
import {
  NAME_STORAGE_CAR_PRODUCTS,
  NAME_STORAGE_TOKEN,
  NAME_STORAGE_TYPE_USER
} from "src/app/shared/const/globals";
import { ResponsiveService } from "src/app/shared/services/responsive.service";
import { LOGIN_MODAL_DIALOG_SIZE } from "src/app/shared/const/size-dialogs";
import { SessionService } from "src/app/shared/services/session.service";
import { ClientType } from "src/app/shared/enums/client-type";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  public productsCount: number;
  public validateSession: boolean;
  public clientType: ClientType;
  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private responsiveService: ResponsiveService,
    private sessionService: SessionService
  ) {
    this.productsCount = 0;
  }

  ngOnInit() {
    this.getClientType();
    this.storageService
      .select(NAME_STORAGE_CAR_PRODUCTS)
      .subscribe(products => {
        this.productsCount = products ? products.length : 0;
      });

    this.storageService.select(NAME_STORAGE_TOKEN).subscribe(token => {
      if (token != null) {
        this.validateSession = true;
      } else {
        this.validateSession = false;
      }
    });
  }

  /**
   * Obtiene el tipo de cliente de la sesión
   */
  getClientType() {
    this.storageService.select(NAME_STORAGE_TYPE_USER).subscribe(type => {
      this.clientType = type != null ? type : ClientType.client;
    });
  }

  /**
   * Abre el modal de registrar o iniicar sesión
   */
  onClickLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: this.responsiveService.getHeigthDialog(LOGIN_MODAL_DIALOG_SIZE),
      width: this.responsiveService.getWidthDialog(LOGIN_MODAL_DIALOG_SIZE),
      panelClass: "mat-dialog-container-clean",
      disableClose: true
    });
  }

  /**
   * Evento click para cerrar sesión
   */
  onClickLogout() {
    this.sessionService.logout().subscribe(x => {
      this.storageService.set(NAME_STORAGE_TOKEN, null);
      this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.client);
      this.storageService.removeAllStorage();
      // this.sessionService.validateSession();
    });
  }
}
