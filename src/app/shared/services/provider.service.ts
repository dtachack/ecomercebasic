import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SITE } from "../const/globals";
import { Provider } from "../models/provider";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProviderService {
  private urlApi: string;
  constructor(private httpClient: HttpClient) {
    this.urlApi = URL_SITE;
  }

  /**
   * Servicio encargado de registrar el proveedor
   * @param provider
   */
  registerProvider(provider: Provider): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/providers`;
    return this.httpClient.post<any>(uri, provider);
  }

  /**
   * Servicio encargado de actualizar el proveedor
   * @param provider
   */
  updateProvider(provider: Provider): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/updateprovider`;
    return this.httpClient.put<any>(uri, provider);
  }

  /**
   * Servicio encargado de obtener el proveedor
   */
  getProvider(): Observable<Provider> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/provider`;
    return this.httpClient.get<Provider>(uri);
  }
}
