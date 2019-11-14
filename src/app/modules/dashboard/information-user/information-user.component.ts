import { Component, OnInit } from "@angular/core";
import { ClientType } from "src/app/shared/enums/client-type";
import {
  NAME_STORAGE_TYPE_USER,
  NAME_STORAGE_EMAIL_USER
} from "src/app/shared/const/globals";
import { StorageService } from "src/app/shared/services/storage.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoadingService } from "src/app/shared/services/loading.service";
import { SessionService } from "src/app/shared/services/session.service";
import { ClientService } from "src/app/shared/services/client.service";
import { Client } from "src/app/shared/models/client";
import { ProviderService } from "src/app/shared/services/provider.service";
import { ToastrService } from "ngx-toastr";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { Provider } from "src/app/shared/models/provider";

@Component({
  selector: "app-information-user",
  templateUrl: "./information-user.component.html",
  styleUrls: ["./information-user.component.scss"]
})
export class InformationUserComponent implements OnInit {
  public clientType: ClientType;
  public formClientGroup: FormGroup;
  public formProviderGroup: FormGroup;
  public isSystem: boolean;
  constructor(
    private clientService: ClientService,
    private loadingService: LoadingService,
    private providerService: ProviderService,
    private sessionService: SessionService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getClientType();
    this.getDataUser();
  }

  /**
   * Obtiene la información de los usuarios
   */
  getDataUser() {
    var emailUser = this.storageService.selectValue(NAME_STORAGE_EMAIL_USER);
    console.log(emailUser);
    if (this.clientType === ClientType.client) {
      this.buildFormClient("", "", "", "");
      this.loadingService.show();
      this.clientService.getClient().subscribe(client => {
        this.loadingService.hide();
        this.formClientGroup.setValue({
          name: client.name,
          phone: client.phone,
          address: client.address,
          email: emailUser
        });
      });
    } else if (this.clientType === ClientType.provider) {
      this.buildFormProvider("", "", "", "");
      this.loadingService.show();
      this.providerService.getProvider().subscribe(provider => {
        this.loadingService.hide();
        this.formProviderGroup.setValue({
          name: provider.name,
          phone: provider.phone,
          address: provider.address,
          email: emailUser,
          nameCompany: provider.providerName,
          isSystem: Boolean(provider.type)
        });
      });
    }
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
   * Construye formulario con campos y validaciones
   */
  private buildFormClient(
    name: string,
    phone: string,
    address: string,
    email: string
  ) {
    this.formClientGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(
        { value: email, disabled: true },
        Validators.required
      ),
      phone: new FormControl(phone),
      address: new FormControl(address)
    });
  }

  /**
   * Construye formulario con campos y validaciones
   */
  private buildFormProvider(
    name: string,
    email: string,
    phone: string,
    address: string
  ) {
    this.formProviderGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      nameCompany: new FormControl("", Validators.required),
      email: new FormControl(
        { value: email, disabled: true },
        Validators.required
      ),
      phone: new FormControl(phone),
      address: new FormControl(address),
      isSystem: new FormControl(false)
    });
  }

  /**
   *  Click en formulario para registrar cliente
   */
  onClickUpdateClient() {
    const clientForm = this.formClientGroup.value;
    const clientToRegister = new Client(
      clientForm.name,
      clientForm.address,
      clientForm.phone
    );

    this.loadingService.show();
    this.clientService.updateClient(clientToRegister).subscribe(result => {
      this.loadingService.hide();
      this.toastr.success("Usuario actualizado correctamente.", "", {
        positionClass: "toast-bottom-right"
      });
    });
  }

  /**
   *  Click en formulario para registrar proveedor
   */
  onClickUpdateProvider() {
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
      .updateProvider(providerToRegister)
      .subscribe(result => {
        this.loadingService.hide();
        this.toastr.success("Proveedor actualizado correctamente.", "", {
          positionClass: "toast-bottom-right"
        });
      });
  }
}
