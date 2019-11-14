import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { URL_API } from "../const/globals";
import { SearchProduct } from "../models/search-product";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root"
})
/**
 * Servicio encargado de consultar metodos de la entidad Producto
 */
export class ProductService {
  private urlApi: string;
  constructor(
    // Services
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
    this.urlApi = URL_API;
  }

  /**
   * Servicio que retorna los productos con paginación y filtro
   * @param start
   * @param size
   * @param direction
   * @param column
   * @param criteria
   */
  getProductsByStartBySizeByCriteria(
    start: number,
    size: number,
    direction: string,
    column: string,
    criteria: string
  ): Observable<SearchProduct> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }products?start=${start}&size=${size}&direction=${direction}&column=${column}&criteria=${criteria}`;
    return this.httpClient.get<SearchProduct>(uri);
  }

  /**
   * Servicio que retorna el producto según su id
   * @param id
   */
  getProductsById(id: number): Observable<Product> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}products/${id}`;
    return this.httpClient.get<Product>(uri);
  }

  /**
   * Servicio que retorna los productos con paginación y filtro
   * @param start
   * @param size
   * @param direction
   * @param column
   * @param criteria
   */
  getProductsCatalogByStartBySizeByCriteria(
    start: number,
    size: number,
    direction: string,
    column: string,
    criteria: string
  ): Observable<SearchProduct> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }offers/prices?start=${start}&size=${size}&direction=${direction}&column=${column}&criteria=${criteria}`;
    return this.httpClient.get<SearchProduct>(uri);
  }

  /**
   * Servicio que registra los productos con la actualización de precios
   * @param id
   */
  registerProductsPrices(products): Observable<any> {
    // Construcciòn de Url con parametros
    const uri = `${this.urlApi}offers/prices`;
    return this.httpClient.patch<any>(uri, products);
  }
}
