import { Injectable } from '@angular/core';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(/*private nativeStorage: NativeStorage*/private storage: Storage) {}

  set(key: string, value: any) {
    return this.storage.set(key, value);
    // return this.nativeStorage.setItem(key, value);
  }

  get(key: string) {
    return this.storage.get(key);
    // return this.nativeStorage.getItem(key);
  }

  clear() {
    return this.storage.clear();
    // return this.nativeStorage.clear();
  }
}
