import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import { NAME_STORAGE_QUOTATION_DETAIL } from "src/app/shared/const/globals";
import { Router } from "@angular/router";
import { Quotation } from "src/app/shared/models/search-quotation";
import { Product } from "src/app/shared/models/product";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ProductService } from "src/app/shared/services/product.service";
import { QuoteService } from "src/app/shared/services/quote.service";
import { MatDialog } from "@angular/material";
import { ResponsiveService } from "src/app/shared/services/responsive.service";
import { DETAIL_QUOTATION_MODAL_DIALOG_SIZE } from "src/app/shared/const/size-dialogs";
import { QuotationOffertsComponent } from "../quotation-offerts/quotation-offerts.component";

@Component({
  selector: "app-quotation-detail",
  templateUrl: "./quotation-detail.component.html",
  styleUrls: ["./quotation-detail.component.scss"]
})
export class QuotationDetailComponent implements OnInit {
  public quotation: Quotation;
  public active: Boolean;
  public quotationId: number;

  //
  public criteria: string;
  public productPage: number = 5;
  public pageActive: number = 1;
  public pages: string[] = [];
  public products: Product[];
  public totalProducts: number = 0;
  public totalPages: number = 1;
  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService,
    private quotationService: QuoteService,
    private responsiveService: ResponsiveService
  ) {
    this.criteria = "";
  }

  ngOnInit() {
    this.getQuotationStorage();
  }

  /**
   * Obtiene la cotización del Storage
   */
  public getQuotationStorage() {
    this.storageService
      .select(NAME_STORAGE_QUOTATION_DETAIL)
      .subscribe(quotation => {
        if (quotation === null)
          this.router.navigateByUrl("/dashboard/quotations");
        this.quotation = quotation;
        if (quotation.expiration !== null)
          this.quotation.active =
            new Date(quotation.expiration).valueOf() > new Date().valueOf()
              ? true
              : false;
        this.getQuotation(quotation.idQuote);
      });
  }

  /**
   * Obtiene la inforamción basica de la cotización
   */
  public getQuotation(quotationId: number) {
    this.loadingService.show();
    this.quotationService
      .getDetailQuotation(quotationId)
      .subscribe(quotation => {
        this.loadingService.hide();
        if (quotation.expiration !== null)
          quotation.active =
            new Date(quotation.expiration).valueOf() > new Date().valueOf()
              ? true
              : false;
        console.log(quotation);
        this.quotation = quotation;
        this.searchProductsQuotation();
      });
  }

  /**
   * Obtiene los productos con los fitlros especificos
   */
  public searchProductsQuotation() {
    if (this.quotation == null) return;
    this.loadingService.show();
    this.quotationService
      .getDetailQuotationByStartBySizeByCriteria(
        this.quotation.idQuote,
        this.productPage * (this.pageActive - 1),
        this.productPage,
        "asc"
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
   * Click para poder mostrar la anterior pagina a la actual
   */
  public onClickSubtractPage() {
    if (this.pageActive.toString() === "1") return;
    this.pageActive--;
    this.searchProductsQuotation();
  }

  /**
   * Click para poder mostrar la siguiente pagina a la actual
   */
  public onClickAddPage() {
    if (this.pageActive.toString() === this.totalPages.toString()) return;
    this.pageActive++;
    this.searchProductsQuotation();
  }

  /**
   * Click en el numero de la página a mostrar
   * @param page
   */
  public onClickShowPage(page: number) {
    this.pageActive = page;
    this.searchProductsQuotation();
  }

  /**
   * Click para ver las ofertas
   * @param product
   */
  public onClickViewOfferts(product: Product) {
    const dialogRef = this.dialog.open(QuotationOffertsComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      height: this.responsiveService.getHeigthDialog(
        DETAIL_QUOTATION_MODAL_DIALOG_SIZE
      ),
      width: this.responsiveService.getWidthDialog(
        DETAIL_QUOTATION_MODAL_DIALOG_SIZE
      ),
      panelClass: "mat-dialog-container-clean",
      disableClose: true,
      data: {
        QuotationId: this.quotation.idQuote,
        ProductId: product.idProduct
      }
    });
  }
}
