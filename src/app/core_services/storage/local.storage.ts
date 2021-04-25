import { Injectable } from '@angular/core';
import { AbstractStorage } from "./abstract.storage";


@Injectable()
export class BrowserLocalStorage implements AbstractStorage {
  /**
   * Storage
   */

  storage = window.localStorage;

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  setJsonItem(key: string, value: object): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getJsonItem(key: string): object | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : value;
  }
}
