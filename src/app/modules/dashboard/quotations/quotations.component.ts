import { Component, OnInit } from "@angular/core";
import { Quotation } from "src/app/shared/models/search-quotation";
import { LoadingService } from "src/app/shared/services/loading.service";
import { QuoteService } from "src/app/shared/services/quote.service";
import { Router } from "@angular/router";
import { StorageService } from "src/app/shared/services/storage.service";
import { NAME_STORAGE_QUOTATION_DETAIL } from "src/app/shared/const/globals";

@Component({
  selector: "app-quotations",
  templateUrl: "./quotations.component.html",
  styleUrls: ["./quotations.component.scss"]
})
export class QuotationsComponent implements OnInit {
  public quotationsPage: number = 5;
  public pageActive: number = 1;
  public pages: string[] = [];
  public quotations: Quotation[];
  public totalQuotations: number = 0;
  public totalPages: number = 1;
  public today: Date = new Date();

  constructor(
    private loadingService: LoadingService,
    private quoteService: QuoteService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.set(NAME_STORAGE_QUOTATION_DETAIL, null);
  }

  ngOnInit() {
    this.searchQuotations();
  }

  /**
   * Encargado de buscar las cotizaciones con los filtros y paginación
   */
  searchQuotations() {
    this.loadingService.show();
    this.quoteService
      .getQuotationsByStartBySizeByCriteria(
        this.quotationsPage * (this.pageActive - 1),
        this.quotationsPage,
        "desc"
      )
      .subscribe(quotations => {
        quotations.page.forEach(element => {
          element.active =
            new Date(element.expiration).valueOf() >
            new Date(element.date).valueOf();

          // console.log(this.today.valueOf());
          // console.log(new Date(element.expiration).valueOf());
          // console.log(this.today.valueOf() > element.expiration.valueOf());
          // console.log(this.today.valueOf() < element.expiration.valueOf());
        });
        this.pages = [];
        this.totalQuotations = quotations.count;
        this.quotations = quotations.page;
        this.loadingService.hide();
        this.showQuotationsPage();
      });
  }

  /**
   * Calcula el numero total de paginas
   */
  private showQuotationsPage() {
    let npages: number = this.totalQuotations / this.quotationsPage;
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
    this.searchQuotations();
  }

  /**
   * Click para poder mostrar la siguiente pagina a la actual
   */
  public onClickAddPage() {
    if (this.pageActive.toString() === this.totalPages.toString()) return;
    this.pageActive++;
    this.searchQuotations();
  }
  /**
   * Click en el numero de la página a mostrar
   * @param page
   */
  public onClickShowPage(page: number) {
    this.pageActive = page;
    this.searchQuotations();
  }

  /**
   * Click para ver el detalle de la cotización
   * @param quotation
   */
  public onClickViewQuotation(quotation: Quotation) {
    this.storageService.set(NAME_STORAGE_QUOTATION_DETAIL, quotation);
    this.router.navigateByUrl("/dashboard/quotation-detail");
  }
}
