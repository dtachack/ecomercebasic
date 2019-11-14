import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientType } from "src/app/shared/enums/client-type";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Client } from "src/app/shared/models/client";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ClientService } from "src/app/shared/services/client.service";
import { ToastrService } from "ngx-toastr";
import { Provider } from "src/app/shared/models/provider";
import { ProviderService } from "src/app/shared/services/provider.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "src/app/shared/services/storage.service";
import {
  NAME_STORAGE_TOKEN,
  NAME_STORAGE_TYPE_USER
} from "src/app/shared/const/globals";
import { SessionService } from "src/app/shared/services/session.service";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public clientType: ClientType;
  public formClientGroup: FormGroup;
  public formProviderGroup: FormGroup;
  public isSystem: boolean;
  constructor(
    private clientService: ClientService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private sessionService: SessionService,
    private toastr: ToastrService
  ) {
    this.validParameters();
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {}

  /**
   * Construye formulario con campos y validaciones
   */
  private buildFormClient(name: string, email: string) {
    this.formClientGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(
        { value: email, disabled: true },
        Validators.required
      ),
      phone: new FormControl(""),
      address: new FormControl("")
    });
  }

  /**
   * Construye formulario con campos y validaciones
   */
  private buildFormProvider(name: string, email: string) {
    this.formProviderGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      nameCompany: new FormControl("", Validators.required),
      email: new FormControl(
        { value: email, disabled: true },
        Validators.required
      ),
      phone: new FormControl(""),
      address: new FormControl(""),
      isSystem: new FormControl(false)
    });
  }

  /**
   * Validación de parametros
   */
  validParameters() {
    this.route.queryParamMap.subscribe(params => {
      if (params.keys.length === 0) {
        this.router.navigateByUrl("/home");
      }
      var clientType = params.get("type");
      if (clientType.toUpperCase() === "Client".toUpperCase()) {
        this.clientType = ClientType.client;

        var name = params.get("name") !== null ? params.get("name") : "";
        var email = params.get("email") !== null ? params.get("email") : "";

        this.buildFormClient(name, email);
      } else if (clientType.toUpperCase() === "Provider".toUpperCase()) {
        this.clientType = ClientType.provider;
        var name = params.get("name") !== null ? params.get("name") : "";
        var email = params.get("email") !== null ? params.get("email") : "";

        this.buildFormProvider(name, email);
      } else {
        this.router.navigateByUrl("/home");
      }
    });
  }

  /**
   *  Click en formulario para registrar cliente
   */
  onClickRegisterClient() {
    const clientForm = this.formClientGroup.value;
    const clientToRegister = new Client(
      clientForm.name,
      clientForm.address,
      clientForm.phone
    );

    this.loadingService.show();
    this.clientService.registerClient(clientToRegister).subscribe(result => {
      this.sessionService.validateSession();
      this.loadingService.hide();
      this.toastr.success("Usuario registrado correctamente.", "", {
        positionClass: "toast-bottom-right"
      });
      this.router.navigateByUrl("/home");
    });
  }

  /**
   *  Click en formulario para registrar proveedor
   */
  onClickRegisterProvider() {
    const providerForm = this.formProviderGroup.value;
    console.log(providerForm);
    const providerToRegister = new Provider(
      providerForm.name,
      providerForm.address,
      providerForm.phone,
      providerForm.nameCompany,
      providerForm.isSystem ? 1 : 0
    );

    this.loadingService.show();
    this.providerService
      .registerProvider(providerToRegister)
      .subscribe(result => {
        this.sessionService.validateSession();
        this.loadingService.hide();
        this.toastr.success("Proveedor registrado correctamente.", "", {
          positionClass: "toast-bottom-right"
        });
        this.router.navigateByUrl("/home");
      });
  }
}
