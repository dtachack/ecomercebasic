import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ClientType } from "src/app/shared/enums/client-type";
import { URL_SITE } from "src/app/shared/const/globals";

@Component({
  selector: "app-register-modal",
  templateUrl: "./register-modal.component.html",
  styleUrls: ["./register-modal.component.scss"]
})
export class RegisterModalComponent implements OnInit {
  public clientTypeSelected: ClientType = null;
  constructor(public dialogRef: MatDialogRef<RegisterModalComponent>) {}

  ngOnInit() {}

  /**
   * Cierra el modal de registro
   */
  onClickClose() {
    this.dialogRef.close();
  }

  /**
   * Selecciona el tipo de cliente
   * @param clientType
   */
  onClickSelectClientType(clientType: ClientType) {
    this.clientTypeSelected = clientType;
  }

  /**
   * Redirecciona la autenticación con Facebook
   */
  onClickRegisterFaceBook() {
    window.location.href =
      URL_SITE + "/Accounts/Facebook?type=" + this.getTextTypeClient();
  }

  /**
   * Redirecciona la autenticación con Google
   */
  onClickRegisterGoogle() {
    window.location.href =
      URL_SITE + "/Accounts/Google?type=" + this.getTextTypeClient();
  }

  /**
   * Redirecciona la autenticación con Microsoft
   */
  onClickRegisterMicrosoft() {
    window.location.href =
      URL_SITE + "/Accounts/Microsoft?type=" + this.getTextTypeClient();
  }

  /**
   * Obtiene el texto según el tipo de cliente
   */
  getTextTypeClient() {
    return this.clientTypeSelected == ClientType.provider
      ? "Provider"
      : "Client";
  }

  
}
