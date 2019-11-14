/**
 * Modelo DTO del la busqueda de las cotizaciones
 */
export class SearchQuotations {
  constructor(public count: number, public page: Quotation[]) {}
}

/**
 * Modelo DTO de una cotización
 */
export class Quotation {
  constructor(
    public idQuote: number,
    public date: Date,
    public expiration: Date,
    public productCount: number,
    public active: boolean,
    public notes: string
  ) {}
}
