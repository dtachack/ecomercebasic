import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StatisticsForDays, StatisticsTopProducts } from "../models/statistics";
import { HttpClient } from "@angular/common/http";
import { URL_API } from "../const/globals";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  private urlApi: string;
  constructor(private httpClient: HttpClient) {
    this.urlApi = URL_API;
  }
  getStatisticsClientForDay(): Observable<StatisticsForDays[]> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }quotes/statistics`;
    return this.httpClient.get<StatisticsForDays[]>(uri);
  }

  getStatisticsProviderForDay(): Observable<StatisticsForDays[]> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }offers/statistics`;
    return this.httpClient.get<StatisticsForDays[]>(uri);
  }

  getTop10ProductsOfferts(): Observable<StatisticsTopProducts[]> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }offers/products/statistics`;
    return this.httpClient.get<StatisticsTopProducts[]>(uri);
  }

  getQuotationNotOffert(): Observable<number> {
    // Construcciòn de Url con parametros
    const uri = `${
      this.urlApi
    }offers/statistics`;
    return this.httpClient.get<number>(uri);
  }

}
