import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ProductService } from "src/app/shared/services/product.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { Router } from "@angular/router";
import { Product } from "src/app/shared/models/product";
import { SessionService } from "src/app/shared/services/session.service";

@Component({
  selector: "app-initial",
  templateUrl: "./initial.component.html",
  styleUrls: ["./initial.component.scss"]
})
export class InitialComponent implements OnInit {
  public pageActive: number = 1;
  public totalPages: number = 1;
  public productPage: number = 6;
  public products: Product[] = [];
  public totalProducts: number = 0;
  public productsPage: Product[] = [];
  public pages: string[] = [];
  public criteria: string;
  public direction: string;
  constructor(
    //Services
    private loadingService: LoadingService,
    private productService: ProductService,
    private router: Router,
    private storageService: StorageService,
    private sessionService: SessionService
  ) {
    this.criteria = "";
    this.direction = "asc";
  }

  ngOnInit() {
    this.getProducts();
  }

  /**
   * Buscar productos
   */
  searchProducts() {
    this.getProducts();
  }

  /**
   * Cambia ordenamiento de productos
   */
  changeDirection(direction: string) {
    this.direction = direction;
    this.searchProducts();
  }

  /**
   * Click para ver el producto
   */
  onClickViewProduct(product: Product) {
    this.router.navigateByUrl("/home/product/" + product.id);
  }

  /**
   * Obtiene todos los preguntos segun paginación
   */
  getProducts() {
    this.loadingService.show();
    this.productService
      .getProductsByStartBySizeByCriteria(
        (this.productPage*(this.pageActive-1)),
        this.productPage,
        this.direction,
        "name",
        this.criteria
      )
      .subscribe(products => {
        this.pages = [];
        this.totalProducts = products.count;
        this.products = products.page;
        this.loadingService.hide();
        this.showProductsPage();
      });
  }

  /**
   * Calcula el numero total de paginas
   */
  private showProductsPage() {
    let npages: number = this.totalProducts / this.productPage;
    if (npages > parseInt(npages.toString()))
      npages = parseInt(npages.toString()) + 1;
    let x: number = 1;
    while (x <= npages) {
      this.pages.push((this.pages.length + 1).toString());
      x++;
    }
    this.totalPages = npages;
  }

  /**
   * Click en el numero de la página a mostrar
   * @param page
   */
  public onClickShowPage(page: number) {
    this.pageActive = page;
    this.searchProducts();
  }

  /**
   * Click para poder mostrar la anterior pagina a la actual
   */
  public onClickSubtractPage() {
    if (this.pageActive.toString() === "1") return;
    this.pageActive--;
    this.searchProducts();
  }

  /**
   * Click para poder mostrar la siguiente pagina a la actual
   */
  public onClickAddPage() {
    if (this.pageActive.toString() === this.totalPages.toString()) return;
    this.pageActive++;
    this.searchProducts();
  }
}
