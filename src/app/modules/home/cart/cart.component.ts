import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import {
  NAME_STORAGE_CAR_PRODUCTS,
  NAME_STORAGE_TYPE_USER
} from "src/app/shared/const/globals";
import { MatDialog } from "@angular/material";
import { LoginModalComponent } from "src/app/modules/home/login-modal/login-modal.component";
import { Product } from "src/app/shared/models/product";
import { ResponsiveService } from "src/app/shared/services/responsive.service";
import { LOGIN_MODAL_DIALOG_SIZE } from "src/app/shared/const/size-dialogs";
import { SessionService } from "src/app/shared/services/session.service";
import { Quote, ProductQuote } from "src/app/shared/models/quote";
import { LoadingService } from "src/app/shared/services/loading.service";
import { QuoteService } from "src/app/shared/services/quote.service";
import { ToastrService } from "ngx-toastr";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ClientType } from "src/app/shared/enums/client-type";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  public productsCount: number;
  public products: Product[];
  public notes: string;
  public clientType: ClientType;
  constructor(
    private storageService: StorageService,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private responsiveService: ResponsiveService,
    private sessionService: SessionService,
    private quoteService: QuoteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getClientType();
    this.getCountProductsCar();
  }
  /**
   * Obtiene la cantidad de productos que tiene el carrito
   */
  getCountProductsCar() {
    this.storageService
      .select(NAME_STORAGE_CAR_PRODUCTS)
      .subscribe(products => {
        this.productsCount = products ? products.length : 0;
        this.products = products;
      });
  }

  /**
   * Obtiene el tipo de cliente de la sesión
   */
  getClientType() {
    this.storageService.select(NAME_STORAGE_TYPE_USER).subscribe(type => {
      this.clientType = type != null ? type : ClientType.client;
    });
  }
  /**
   * Elimina el producto del carrito
   */
  onClickRemoveProduct(product: Product) {
    this.products = this.products.filter(x => x.id !== product.id);
    this.storageService.set(NAME_STORAGE_CAR_PRODUCTS, this.products);
  }

  /**
   * Reduce la cantidad de productos del carrito
   */
  onClickSubtractCountProduct(product: Product) {
    var productFind = this.products.find(x => x.id === product.id);
    if (productFind.count === 1) return;
    productFind.count--;
    this.storageService.set(NAME_STORAGE_CAR_PRODUCTS, this.products);
  }

  /**
   * Aumenta la cantidad de productos del carrito
   */
  onClickAddCountProduct(product: Product) {
    var productFind = this.products.find(x => x.id === product.id);
    productFind.count++;
    this.storageService.set(NAME_STORAGE_CAR_PRODUCTS, this.products);
  }

  /**
   * Click para enviar la cotización
   */
  onClickSendQuotation() {
    if (!this.validateSession()) {
      const dialogRef = this.dialog.open(LoginModalComponent, {
        maxWidth: "100vw",
        maxHeight: "100vh",
        height: this.responsiveService.getHeigthDialog(LOGIN_MODAL_DIALOG_SIZE),
        width: this.responsiveService.getWidthDialog(LOGIN_MODAL_DIALOG_SIZE),
        panelClass: "mat-dialog-container-clean",
        disableClose: true
      });
      return;
    }

    const productsToRegisterQuote: ProductQuote[] = [];
    this.products.forEach(product => {
      productsToRegisterQuote.push(new ProductQuote(product.id, product.count));
    });
    const quoteToRegister: Quote = new Quote(
      this.notes,
      productsToRegisterQuote
    );

    this.loadingService.show();

    this.quoteService.registerQuote(quoteToRegister).subscribe(result => {
      console.log(result);
      this.loadingService.hide();
      this.toastr.success("Cotización registrada correctamente.", "", {
        positionClass: "toast-bottom-right"
      });
      this.router.navigateByUrl("/home");
      this.storageService.set(NAME_STORAGE_CAR_PRODUCTS, null);
    });
  }

  /**
   * Valida si hay una sesión existente
   */
  validateSession() {
    return this.sessionService.isSessionActive();
  }
}
