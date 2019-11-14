/**
 * Modelo DTO de cotización
 */
export class Quote {
  constructor(
    public notes: string,
    public detail: ProductQuote[]
  ) {}
}
/**
 * Modelo DTO de productos de una cotización
 */
export class ProductQuote {
  constructor(public idProduct: string, public quantity: number) {}
}
