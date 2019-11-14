import { Injectable } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { SizeDialog } from "../models/size-dialog";

@Injectable({
  providedIn: "root"
})
export class ResponsiveService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  /**
   * Determines if the width is less than the value inserted.
   * @number width
   */
  isWidthLessThan(width: number): boolean {
    return this.breakpointObserver.isMatched(`(max-width: ${width}px)`);
  }

  /**
   * Determines if the screen width is less than 360 px
   */
  isWidthLessThan360px(): boolean {
    return this.isWidthLessThan(360);
  }
  /**
   * Determines if the screen width is less than 480 px
   */
  isWidthLessThan480px(): boolean {
    return this.isWidthLessThan(480);
  }

  /**
   * Determines if the screen width is less than 768 px
   */
  isWidthLessThan768px(): boolean {
    return this.isWidthLessThan(768);
  }

  /**
   * Determines if the screen width is less than 1024 px
   */
  isWidthLessThan1024px(): boolean {
    return this.isWidthLessThan(1024);
  }

  /**
   * Determines if the screen width is less than 1280 px
   */
  isWidthLessThan1280px(): boolean {
    return this.isWidthLessThan(1280);
  }

  /**
   * Get the width of the modal according to screen pixels
   * @SizeDialog sizeDialog
   */
  getWidthDialog(sizeDialog: SizeDialog) {
    if (this.isWidthLessThan360px()) {
      return sizeDialog.width360px;
    }
    if (this.isWidthLessThan480px()) {
      return sizeDialog.width480px;
    }
    if (this.isWidthLessThan768px()) {
      return sizeDialog.width768px;
    }
    if (this.isWidthLessThan1024px()) {
      return sizeDialog.heigth1024px;
    }
    if (this.isWidthLessThan1280px()) {
      return sizeDialog.heigth1280px;
    }
    return sizeDialog.width1440px;
  }

  /**
   * Get the height of the modal according to screen pixels
   * @SizeDialog sizeDialog
   */
  getHeigthDialog(sizeDialog: SizeDialog) {
    if (this.isWidthLessThan360px()) {
      return sizeDialog.heigth360px;
    }
    if (this.isWidthLessThan480px()) {
      return sizeDialog.heigth480px;
    }
    if (this.isWidthLessThan768px()) {
      return sizeDialog.heigth768px;
    }
    if (this.isWidthLessThan1024px()) {
      return sizeDialog.heigth1024px;
    }
    if (this.isWidthLessThan1280px()) {
      return sizeDialog.heigth1280px;
    }
    return sizeDialog.heigth1440px;
  }
}
