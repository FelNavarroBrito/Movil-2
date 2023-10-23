import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)

  //LOADING

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  //TOAST

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ENRUTA CUALQUIER PAGINA DISPONIBLE

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // GUARDA UN ELEMENTO EN EL LOCAL STORAGE

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // OBTERNER ELEMENTO DESDE LOCAL STORAGE

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

}
