import { Injectable } from "@angular/core";
import { URL_API, NAME_STORAGE_TYPE_USER, NAME_STORAGE_CAR_PRODUCTS, NAME_STORAGE_TOKEN, NAME_STORAGE_QUOTATION_DETAIL, NAME_STORAGE_EMAIL_USER } from "../const/globals";
import { Observable, BehaviorSubject } from "rxjs";
import { ClientType } from '../enums/client-type';
@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() { }
  protected subjects: { [key: string]: BehaviorSubject<any> } = {};

  /**
   * Obtiene el valor de  una variable suscribiendose a los cambios de la misma
   * @param key Valor de la llave con que se va a guardar la variable
   * @param defaultValue Valor por defecto
   */
  select(key: string, defaultValue: any = null): Observable<any> {
    if (this.subjects.hasOwnProperty(key)) {
      return this.subjects[key];
    }

    if (!window.localStorage.getItem(key) && defaultValue) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    const value = window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : defaultValue;

    return (this.subjects[key] = new BehaviorSubject(value));
  }

  /**
   * Obtiene el valor de  una variable suscribiendose a los cambios de la misma
   * @param key Valor de la llave con que se va a guardar la variable
   * @param defaultValue Valor por defecto
   */
  selectValue(key: string, defaultValue: any = null) {
    if (this.subjects.hasOwnProperty(key)) {
      return this.subjects[key];
    }

    if (!window.localStorage.getItem(key) && defaultValue) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    const value = window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : defaultValue;

    return value;
  }
  /**
   * Guarda información en el Local Storage
   * @param key Valor de la llave con que se va a guardar la variable
   * @param value Valor de la variable
   */
  set(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
    if (this.subjects.hasOwnProperty(key)) {
      this.subjects[key].next(value);
    }
  }

  /**
   * Elimina el valor de una variable del Local Storage
   * @param key
   */
  remove(key: string): void {
    window.localStorage.removeItem(key);
    if (this.subjects.hasOwnProperty(key)) {
      this.subjects[key].next(null);
    }
  }

  /**
 * Elimina el valor de todas las varuables del Local Storage
 * @param key
 */
  removeAllStorage(): void {

    this.remove(NAME_STORAGE_TYPE_USER);
    this.remove(NAME_STORAGE_TOKEN);
    this.remove(NAME_STORAGE_QUOTATION_DETAIL);
    this.remove(NAME_STORAGE_EMAIL_USER);

    this.set(NAME_STORAGE_TYPE_USER, ClientType.client)
  }
}
