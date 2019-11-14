import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from 'src/app/shared';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  public products:Product[];
  public dtOptions: DataTables.Settings = {};
  constructor(
    private loadingService: LoadingService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getProducts();
  }
  /**
   * Obtiene todos los preguntos segun paginación
   */
  getProducts() {
    this.loadingService.show();
    // this.productService.getProductsByStartBySize(0, 20).subscribe(products => {
    //   this.products = products as Product[];
    //   this.loadingService.hide();
    // });
  }
}
