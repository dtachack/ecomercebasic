import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { RegisterModalComponent } from "src/app/modules/home/register-modal/register-modal.component";
import { ResponsiveService } from "src/app/shared/services/responsive.service";
import { REGISTER_MODAL_DIALOG_SIZE } from "src/app/shared/const/size-dialogs";
import { URL_SITE } from "src/app/shared/const/globals";

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"]
})
export class LoginModalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit() {}

  /**
   * Cierra el modal de iniciar sesión
   */
  onClickClose() {
    this.dialogRef.close();
  }

  /**
   * Redirecciona la autenticación con Facebook
   */
  onClickLoginFaceBook() {
    window.location.href = URL_SITE + "/Accounts/Facebook";
  }

  /**
   * Redirecciona la autenticación con Google
   */
  onClickLoginGoogle() {
    window.location.href = URL_SITE + "/Accounts/Google";
  }

  /**
   * Redirecciona la autenticación con Microsoft
   */
  onClickLoginMicrosoft() {
    window.location.href = URL_SITE + "/Accounts/Microsoft";
  }

  /**
   * Click para abrir modal de abrir modal del registro
   */
  onClickRegister() {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(RegisterModalComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: this.responsiveService.getHeigthDialog(
        REGISTER_MODAL_DIALOG_SIZE
      ),
      width: this.responsiveService.getWidthDialog(REGISTER_MODAL_DIALOG_SIZE),
      panelClass: "mat-dialog-container-clean",
      disableClose: true
    });
  }
}
