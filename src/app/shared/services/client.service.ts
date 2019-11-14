import { Injectable } from "@angular/core";
import { Client } from "../models/client";
import { Observable } from "rxjs";
import { URL_SITE } from "../const/globals";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private urlApi: string;
  constructor(private httpClient: HttpClient) {
    this.urlApi = URL_SITE;
  }

  /**
   * Servicio encargado de registrar el cliente
   */
  registerClient(client: Client): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/clients`;
    return this.httpClient.post<any>(uri, client);
  }

   /**
   * Servicio encargado de actualizar el cliente
   */
  updateClient(client: Client): Observable<Client> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/updateclient`;
    return this.httpClient.put<Client>(uri, client);
  }

   /**
   * Servicio encargado de obtener los datos del client
   */
  getClient(): Observable<Client> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}/accounts/client`;
    return this.httpClient.get<Client>(uri);
  }
}
