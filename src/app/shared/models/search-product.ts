import { Product } from "./product";

/**
 * Modelo DTO del la busqueda del producto
 */
export class SearchProduct {
  [x: string]: any;
  count: number;
  page: Product[];
  constructor() {
    this.count = 0;
    this.page = [];
  }
}
