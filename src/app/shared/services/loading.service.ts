import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { NAME_STORAGE_LOADING } from "../const/globals";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  constructor(private storageService: StorageService) {}

  /**
   * Activa el Loading
   */
  public show() {
    this.storageService.set(NAME_STORAGE_LOADING, true);
  }

  /**
   * Oculta el Loading
   */
  public hide() {
    this.storageService.set(NAME_STORAGE_LOADING, false);
  }
}
