import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { headersToString } from "selenium-webdriver/http";
import {
  URL_SITE,
  NAME_STORAGE_TOKEN,
  NAME_STORAGE_TYPE_USER,
  ISPROD,
  NAME_STORAGE_EMAIL_USER
} from "../const/globals";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ClientType } from "../enums/client-type";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  private urlSite: string;
  constructor(
    private httpClient: HttpClient,
    // Services
    private storageService: StorageService
  ) {
    this.urlSite = URL_SITE;
  }

  /**
   * Valida si existe un usuario en la sesión
   */
  public isSessionActive(): boolean {
    var token = this.storageService.selectValue(NAME_STORAGE_TOKEN);
    return token.value !== null ? true : false;
  }

  /**
   * Obtiene el token del usuario
   */
  public getTokenUser(): Observable<string> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlSite}/Accounts/Token`;
    return this.httpClient.get<string>(uri);
  }

  /**
   * Cierra la sesón del usuario
   */
  public logout(): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlSite}/Accounts/Logout`;
    return this.httpClient.post<string>(uri, null);
  }

  /**
   * Valida token de la sesión
   */
  public validateSession() {
    var jwtService = new JwtHelperService();
    this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.client);
    // var tokenSession = this.storageService.selectValue(NAME_STORAGE_TOKEN);

    // if (tokenSession !== null && tokenSession.value !== null) {
    //   return;
    //   // if (jwtService.isTokenExpired(tokenSession))
    //   //   this.storageService.set(NAME_STORAGE_TOKEN, null);
    // }
    if (ISPROD) {
      this.getTokenUser().subscribe(resultToken => {
        var token = resultToken["token"];
        this.storageService.set(NAME_STORAGE_TOKEN, token);
        var tokenDecode = jwtService.decodeToken(token);
        var role: string =
          tokenDecode[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        var email =
          tokenDecode[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        if (email) this.storageService.set(NAME_STORAGE_EMAIL_USER, email);
        if (role.toUpperCase() === "client".toUpperCase()) {
          this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.client);
        } else if (role.toUpperCase() === "provider".toUpperCase()) {
          this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.provider);
        }
      });
    } else {
      // this.getTokenUser().subscribe(resultToken => {
      // CLIENTE
      // var resultToken = {
      //   token:
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjbGllbnQiLCJJZENsaWVudCI6IjM2IiwibmJmIjoxNTU1ODg5NjQxLCJleHAiOjE1NTgzMDg4NDEsImlzcyI6Imh0dHBzOi8vdHVyaW5nLmFlc29mdC5qYXZlcmlhbmEuZWR1LmNvIiwiYXVkIjoiaHR0cHM6Ly90dXJpbmcuYWVzb2Z0LmphdmVyaWFuYS5lZHUuY28ifQ.roSfzo-2Vhf4wBH6Thf3IaIWGAW1th6kb-w89KK-v5c"
      // };
      // PROVEEDOR
      var resultToken = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJwcm92aWRlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImplcmVteXBlZHJhemF2QGdtYWlsLmNvbSIsIklkUHJvdmlkZXIiOiIzIiwibmJmIjoxNTU1ODk0MjgwLCJleHAiOjE1NTgzMTM0ODAsImlzcyI6Imh0dHBzOi8vdHVyaW5nLmFlc29mdC5qYXZlcmlhbmEuZWR1LmNvIiwiYXVkIjoiaHR0cHM6Ly90dXJpbmcuYWVzb2Z0LmphdmVyaWFuYS5lZHUuY28ifQ.TgwASGKsf4Kec3dLDdBYcClkKb8-okiDeJ83eeBX99M"
      };
      var token = resultToken["token"];
      this.storageService.set(NAME_STORAGE_TOKEN, token);
      var tokenDecode = jwtService.decodeToken(token);
      var role: string =
        tokenDecode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      var email =
        tokenDecode[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];
      if (email) this.storageService.set(NAME_STORAGE_EMAIL_USER, email);
      if (role.toUpperCase() === "client".toUpperCase()) {
        this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.client);
      } else if (role.toUpperCase() === "provider".toUpperCase()) {
        this.storageService.set(NAME_STORAGE_TYPE_USER, ClientType.provider);
      }
      //});
    }
  }
}
