import { Component, ViewContainerRef } from "@angular/core";
import { SessionService } from "./shared/services/session.service";
import { StorageService } from "./shared/services/storage.service";
import {
  NAME_STORAGE_TOKEN,
  NAME_STORAGE_TYPE_USER
} from "./shared/const/globals";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClientType } from "./shared/enums/client-type";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(
    private sessionService: SessionService,
    private storageService: StorageService
  ) {}
  ngOnInit() {
    this.validateSession();
  }

  /**
   * Valida token de la sesión
   */
  public validateSession() {
    this.sessionService.validateSession();
  }
}
