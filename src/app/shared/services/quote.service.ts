import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_API } from "../const/globals";
import { Quote } from "../models/quote";
import { Observable } from "rxjs";
import { SearchQuotations, Quotation } from "../models/search-quotation";
import { SearchProduct } from "../models/search-product";
import { SearchOfferts } from "../models/offert-product";

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  private urlApi: string;
  constructor(private httpClient: HttpClient) {
    this.urlApi = URL_API;
  }

  /**
   * Servicio encargado de registrar la cotización
   */
  registerQuote(quote: Quote): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}quotes`;
    return this.httpClient.post<any>(uri, quote);
  }

  /**
   * Servicio que retorna las cotizaciones con paginación y filtro
   * @param start
   * @param size
   * @param direction
   * @param column
   * @param criteria
   */
  getQuotationsByStartBySizeByCriteria(
    start: number,
    size: number,
    direction: string
  ): Observable<SearchQuotations> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }quotes?start=${start}&size=${size}&direction=${direction}`;
    return this.httpClient.get<SearchQuotations>(uri);
  }

  /**
   * Servicio que retorna la información de la cotización
   */
  getDetailQuotation(quotationId: number): Observable<Quotation> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}quotes/${quotationId}`;
    return this.httpClient.get<Quotation>(uri);
  }

  /**
   * Servicio que retorna los productos de la cotización
   * @param size
   * @param direction
   * @param column
   */
  getDetailQuotationByStartBySizeByCriteria(
    quotationId: number,
    start: number,
    size: number,
    direction: string
  ): Observable<SearchProduct> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }quotes/${quotationId}/detail?start=${start}&size=${size}&direction=${direction}`;
    return this.httpClient.get<SearchProduct>(uri);
  }

  /**
   * Servicio que retorna el detaller de las oferta de los productos de la cotización
   * @param size
   * @param direction
   * @param column
   */
  getDetailOffertsByStartBySize(
    quotationId: number,
    productId: number,
    start: number,
    size: number,
    direction: string
  ): Observable<SearchOfferts> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }quotes/${quotationId}/offers/products/${productId}?start=${start}&size=${size}&direction=${direction}`;
    return this.httpClient.get<SearchOfferts>(uri);
  }
}
