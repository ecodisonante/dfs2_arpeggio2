import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


/**
 * Clase de servicios encargada de encapsular el almacenamiento de sessionStorage y evitar que se ejecute del lado del servidor
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser && sessionStorage) {
      sessionStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser && sessionStorage) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser && sessionStorage) {
      sessionStorage.removeItem(key);
    }
  }
}
