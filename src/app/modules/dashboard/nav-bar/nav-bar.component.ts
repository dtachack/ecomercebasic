import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/shared/services/session.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { NAME_STORAGE_TOKEN, NAME_STORAGE_TYPE_USER } from "src/app/shared/const/globals";
import { Router } from "@angular/router";
import { Client } from 'src/app/shared/models/client';
import { ClientType } from 'src/app/shared/enums/client-type';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Evento click para cerrar sesión
   */
  onClickLogout() {
    this.sessionService.logout().subscribe(x => {
      this.storageService.set(NAME_STORAGE_TOKEN, null);
      this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.client);
      this.router.navigateByUrl("/home");
      this.storageService.removeAllStorage();
    });
  }
}
