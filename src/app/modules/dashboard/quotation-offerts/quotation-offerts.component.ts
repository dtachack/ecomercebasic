import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { SearchOfferts, Offert } from "src/app/shared/models/offert-product";
import { QuoteService } from "src/app/shared/services/quote.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "app-quotation-offerts",
  templateUrl: "./quotation-offerts.component.html",
  styleUrls: ["./quotation-offerts.component.scss"]
})
export class QuotationOffertsComponent implements OnInit {
  public productPage: number = 5;
  public pageActive: number = 1;
  public pages: string[] = [];
  public offerts: Offert[];
  public totalProducts: number = 0;
  public totalPages: number = 1;

  private ProductId: number;
  private QuotationId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuotationOffertsComponent>,
    private loadingService: LoadingService,
    public quoteService: QuoteService
  ) {
    this.QuotationId = data.QuotationId;
    this.ProductId = data.ProductId;
  }

  ngOnInit() {
    setTimeout(() => {
      this.searchDetailOfferts();
    }, 1);
  }

  /**
   * Obtiene los productos con los filtros especificos
   */
  searchDetailOfferts() {
    this.loadingService.show();
    this.quoteService
      .getDetailOffertsByStartBySize(
        this.QuotationId,
        this.ProductId,
        this.productPage * (this.pageActive - 1),
        this.productPage,
        "asc"
      )
      .subscribe(offerts => {
        this.pages = [];
        this.totalProducts = offerts.count;
        this.offerts = offerts.page;
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
    this.searchDetailOfferts();
  }

  /**
   * Click para poder mostrar la siguiente pagina a la actual
   */
  public onClickAddPage() {
    if (this.pageActive.toString() === this.totalPages.toString()) return;
    this.pageActive++;
    this.searchDetailOfferts();
  }

  /**
   * Click en el numero de la página a mostrar
   * @param page
   */
  public onClickShowPage(page: number) {
    this.pageActive = page;
    this.searchDetailOfferts();
  }

  /**
   * Click para cerrar modal
   */
  onClickClose(){
    this.dialogRef.close();
  }
}
