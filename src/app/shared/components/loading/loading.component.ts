import { Component, OnInit, Input } from "@angular/core";
import { LoadingEnum } from "../../enums/loading";
import { StorageService } from "../../services/storage.service";
import { NAME_STORAGE_LOADING } from "../../const/globals";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  // Inputs
  @Input() backgroundColor: string;
  @Input() color: string;
  @Input() imageUrl: string;
  @Input() widthImage: string;
  @Input() loadingType: LoadingEnum;

  // Component Properties
  isLoading: boolean;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadingType = this.loadingType
      ? this.loadingType
      : LoadingEnum.isRipple;

    this.isLoading = false;
    this.storageService.select(NAME_STORAGE_LOADING).subscribe(x => {
      this.isLoading = x;
    });
  }

  /**
   * Get the color style of the edge of the loading animation
   */
  getBorderColorDualRing() {
    return `${this.color} transparent ${this.color} transparent`;
  }
  /**
   * Get the color of the edge of the loading animation
   */
  getColor() {
    return this.color ? this.color : "white";
  }
  /**
   * Get Width Image
   */
  getWidth() {
    return this.widthImage ? this.widthImage : "400ww";
  }
  /**
   * Show the image if any
   */
  showImage() {
    return this.imageUrl ? true : false;
  }
  /**
   * Get background color loading
   */
  getBackgroundColor() {
    return this.backgroundColor
      ? this.backgroundColor
      : "rgba(14, 42, 71, 0.9)";
  }
}
