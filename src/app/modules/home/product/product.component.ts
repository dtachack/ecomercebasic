import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "src/app/shared/services/storage.service";
import {
  NAME_STORAGE_CAR_PRODUCTS,
  NAME_STORAGE_TYPE_USER
} from "src/app/shared/const/globals";
import { Product } from "src/app/shared/models/product";
import { ClientType } from "src/app/shared/enums/client-type";
import { ProductService } from "src/app/shared/services/product.service";
import { LoadingService } from "src/app/shared/services/loading.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  // Private Properties
  public clientType: ClientType;
  private ProductId: number;
  public product: Product;
  public countProduct: number;
  constructor(
    private activateRoute: ActivatedRoute,
    private storageService: StorageService,
    private laodinService: LoadingService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.countProduct = 1;
    this.getClientType();
    this.ProductId = this.activateRoute.snapshot.params["ProductId"];
    // NOTE: When a mat dialog is opened on the view init of the componente, it is necessary to set a timeout to open it
    // in order to avoid the error "ExpressionChangedAfterItHasBeenCheckedError"
    setTimeout(() => {
      this.isValidParameters();
    }, 1);
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
   * Valida parametros de entrada
   */
  isValidParameters() {
    if (!this.ProductId) {
      this.toastr.error("Se debe seleccionar un producto no válido.", "", {
        positionClass: "toast-bottom-right"
      });
    }

    this.getProductById(this.ProductId);
    // var products = this.storageService.selectValue(NAME_STORAGE_PRODUCTS);
    // products = products !== null ? products : [];
    // var productFind = products.find(
    //   x => x.id.toString() === this.ProductId.toString()
    // );
    // if (productFind === undefined) {
    //   this.toastr.error("Se debe seleccionar un producto válido.");
    //   this.router.navigateByUrl("/home");
    // }
    // this.product = productFind;
  }

  /**
   * Obtiene el producto según el id
   * @param id
   */
  getProductById(id: number) {
    this.laodinService.show();
    this.productService.getProductsById(id).subscribe(product => {
      this.product = product;
      this.laodinService.hide();
    });
  }

  /**
   * Evento click para aumentar numero de productos
   */
  onClickAddCountProduct() {
    this.countProduct++;
  }
  /**
   * Se ejecuta cuando se da click para agregar producto a carro de compras
   */
  onClickAddProduct(productSelected: Product) {
    var products = this.storageService.selectValue(NAME_STORAGE_CAR_PRODUCTS);
    products = products.value !== null ? products.value : [];
    var productFind = products.find(x => x.id === productSelected.id);
    if (productFind !== undefined) {
      productFind.count = this.countProduct;
    } else {
      productSelected.count = this.countProduct;
      products.push(productSelected);
    }
    this.storageService.set(NAME_STORAGE_CAR_PRODUCTS, products);

    this.toastr.success("Producto agregado correctamente", "", {
      positionClass: "toast-bottom-right"
    });
    this.router.navigateByUrl("/home/cart");
  }
  /**
   * Evento click para restar numero de productos
   */
  onClickSubtractCountProduct() {
    if (this.countProduct == 1) return;
    this.countProduct--;
  }
}
