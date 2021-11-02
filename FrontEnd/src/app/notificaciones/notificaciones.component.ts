import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor(public _notificacionService: NotificacionService) {
    this._notificacionService.requestPermission();
    console.log('Validacion notif 1');
  }

  ngOnInit() {
  }

}
