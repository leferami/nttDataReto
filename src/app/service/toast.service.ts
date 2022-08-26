import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {  v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private tiempo = 10000;
  private key = "myKey1Toast";
  constructor(protected messageService: MessageService) { }

  showError(mensaje: string, key?: any) {
    this.messageService.add({
      severity: "error",
      summary: "Notificación del sistema",
      detail: mensaje,
      life: this.tiempo,
      key: key ? key : this.key
    });
  }

  showSuccess(mensaje: string, key?: any) {
    this.messageService.add({
      severity: "success",
      summary: "Notificación del sistema",
      detail: mensaje,
      life: this.tiempo,
      key: key ? key : this.key
    });
  }
  
  showInfo(mensaje: string, key?: any) {
    this.messageService.add({
      severity: "info",
      summary: "Notificación del sistema",
      detail: mensaje,
      life: this.tiempo,
      key: key ? key : this.key
    });
  }

  generarIDToast() {
    return v4();
  }
}
