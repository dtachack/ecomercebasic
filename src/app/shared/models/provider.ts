import { ProviderType } from "../enums/provider-type";

/**
 * Modelo DTO del proveedor
 */
export class Provider {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public providerName: string,
    public type: ProviderType
  ) {}
}
