/**
 * Modelo DTO del la busqueda de las cotizaciones
 */
export class SearchOfferts {
  constructor(public count: number, public page: Offert[]) {}
}

/**
 * Modelo DTO de una oferta
 */
export class Offert {
  constructor(
    public idProvider: number,
    public name: string,
    public price: number,
    public validity: Date
  ) {}
}
