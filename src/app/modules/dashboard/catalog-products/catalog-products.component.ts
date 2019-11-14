import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from "src/app/shared";
import { CurrencyPipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-catalog-products",
  templateUrl: "./catalog-products.component.html",
  styleUrls: ["./catalog-products.component.scss"]
})
export class CatalogProductsComponent implements OnInit {
  public criteria: string;
  public productPage: number = 5;
  public pageActive: number = 1;
  public pages: string[] = [];
  public products: Product[];
  public totalProducts: number = 0;
  public totalPages: number = 1;
  public productsToSave: Product[] = [];
  constructor(
    private loadingService: LoadingService,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private toastrService: ToastrService
  ) {
    this.criteria = "";
  }

  ngOnInit() {
    this.getProductsCatalog();
  }

  /**
   * Pone el producto en la lista para realizar el guardado
   */
  public changePrice(newPrice, product: Product) {
    var productToSave = this.products.find(
      x => x.idProduct === product.idProduct
    );
    productToSave.price = newPrice;
    var finProduct = this.productsToSave.find(
      x => x.idProduct === product.idProduct
    );
    if (!finProduct) {
      this.productsToSave.push(productToSave);
    } else {
      this.productsToSave = this.productsToSave.filter(
        x => x.idProduct !== product.idProduct
      );
      this.productsToSave.push(productToSave);
    }
  }

  /**
   * Obtiene los productos con los fitlros especificos
   */
  getProductsCatalog() {
    this.loadingService.show();
    this.productService
      .getProductsCatalogByStartBySizeByCriteria(
        this.productPage * (this.pageActive - 1),
        this.productPage,
        "asc",
        "name",
        this.criteria
      )
      .subscribe(products => {
        products.page.forEach(product => {
          var productFind = this.productsToSave.find(
            x => x.idProduct === product.idProduct
          );
          if (productFind) product.price = productFind.price;
        });

        // products.page.forEach(product => {
        //   product.priceFormat = this.formatCurrency(product.price);
        // });
        this.pages = [];
        this.totalProducts = products.count;
        this.products = products.page;
        this.loadingService.hide();
        this.showProductsPage();
      });
  }

  /**
   * Guarda los productos que fueron actualizados
   */
  public onClickSaveProductsPrice() {
    const productsToSave = [];
    this.productsToSave.forEach(product => {
      productsToSave.push({
        idProduct: product.idProduct,
        idProviderPrice: product.idProviderPrice,
        price: product.price
      });
    });
    this.loadingService.show();
    this.productService
      .registerProductsPrices(productsToSave)
      .subscribe(result => {
        this.productsToSave=[];
        this.loadingService.hide();
        this.toastrService.success(
          "Actualización realizada correctamente.",
          "",
          {
            positionClass: "toast-bottom-right"
          }
        );
        this.getProductsCatalog();
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
   * Click para poder mostrar la anterior pagina a la actual
   */
  public onClickSubtractPage() {
    if (this.pageActive.toString() === "1") return;
    this.pageActive--;
    this.getProductsCatalog();
  }

  /**
   * Click para poder mostrar la siguiente pagina a la actual
   */
  public onClickAddPage() {
    if (this.pageActive.toString() === this.totalPages.toString()) return;
    this.pageActive++;
    this.getProductsCatalog();
  }

  /**
   * Click para cancelar cambios
   */
  public onClickCancelChanges() {
    this.criteria = "";
    this.productsToSave = [];
    this.pageActive = 1;
    this.getProductsCatalog();
  }
  /**
   * Click en el numero de la página a mostrar
   * @param page
   */
  public onClickShowPage(page: number) {
    this.pageActive = page;
    this.getProductsCatalog();
  }

  transformAmount(element, product: Product) {
    product.priceFormat = this.formatCurrency(
      this.removeFormatCurrency(product.priceFormat)
    );
    console.log(
      this.formatCurrency(this.removeFormatCurrency(product.priceFormat))
    );
    //console.log(this.currencyPipe.transform(product.price, "USD"));
    // Remove or comment this line if you dont want
    // to show the formatted amount in the textbox.
  }

  /**
   * Convierte valor numerico en formato moneda
   * @param price
   */
  private formatCurrency(price: number): string {
    return this.currencyPipe.transform(price, "COP");
  }

  /**
   * Elimina formato moneda de una cadena
   * @param price
   */
  private removeFormatCurrency(price: string): number {
    return Number(price.replace("$", ""));
  }
}
