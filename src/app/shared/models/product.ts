/**
 * Modelo DTO del producto
 */
export class Product {
  id: string;
  name: string;
  url: string;
  count: number;
  descripcion: string;
  /**
   * Properties Product Price
   */
  idProduct: number;
  idProviderPrice: number;
  price: number;
  priceFormat: string;
  quantity: number;
  providerCount: number;
  constructor() {
    this.id = "";
    this.name = "";
    this.url = "";
    this.count = 0;
  }
}
