import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: Toast) { }

  show(message: string) {
    return this.toast.show(message, '3000', 'top');
  }

  hide() {
    return this.toast.hide();
  }
}
