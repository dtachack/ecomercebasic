import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { ToastrService } from "ngx-toastr";
import { NAME_STORAGE_TOKEN } from "../const/globals";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { LoadingService } from "./loading.service";
import { SessionService } from './session.service';
@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService {
  token: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private loadingService: LoadingService
  ) {
    this.storageService.select(NAME_STORAGE_TOKEN).subscribe(token => {
      this.token = token;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const arrayStrings = ["assets", "Accounts/Token"]; // Lista para discriminar interceptor

    // Validacion para peticiones que no necesita header Authorization
    if (this.containsString(req.url, arrayStrings)) {
      return next.handle(req);
    }

    // The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${this.token}`)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Forzar cerrado de sesion
          // this.router.navigateByUrl("/home");
          this.toastrService.error(
            "La sesión de la cuenta ha caducado o es invalida.",
            "",
            {
              positionClass: "toast-bottom-right"
            }
          );

          this.storageService.removeAllStorage();
        }
        if (error.status !== 200) {
          this.loadingService.hide();
          if (error.status !== 401)
            this.toastrService.error(
              "Ocurrió un error al momento de procesar la solicitud",
              "",
              {
                positionClass: "toast-bottom-right"
              }
            );

          if (error.status === 404) {
            this.router.navigateByUrl("/home");
          }
        }

        return throwError(error);
      })
    );
  }

  /**
   * Verifica si la url contiene algun elemento del listado
   * @param array listado strings
   */
  containsString(url: string, array: string[]) {
    for (const item of array) {
      if (url.indexOf(item) > -1) {
        return true;
      }
    }
    return false;
  }
}
