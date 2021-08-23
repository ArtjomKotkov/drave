import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage = window.localStorage;

  write(key: string, data: string): void {
    this.storage.setItem(key, data);
  }

  read(key: string): any {
    return this.storage.getItem(key);
  }
}
