import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from '../services/crypto.services';
import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  viewProviders: [CryptoService],
})
export class MainComponent implements OnInit {

  menus: Object[];
  user: string;
  perfil: string;

  usermenu: Object[] = [{
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];

  constructor(private _router: Router, private _cryptoService: CryptoService, private _notificacionService: NotificacionService) { }

  ngOnInit() {

    if (sessionStorage.getItem('Menus')) {
      var mcipher = this._cryptoService.decryptText(sessionStorage.getItem('Menus'));
      this.user = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
      var json = JSON.parse(mcipher.toString());
      this.menus = json;

      var perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
      var perfilDec = JSON.parse(perfilcipher.toString());
      this.perfil = perfilDec;

    } else {
      sessionStorage.clear();
      sessionStorage.removeItem('Menus');
      sessionStorage.removeItem('User');
      sessionStorage.clear();
      this._router.navigate(['error']);
    }
  }

  logout(): void {
    sessionStorage.clear();
    sessionStorage.removeItem('Menus');
    sessionStorage.removeItem('User');
    sessionStorage.clear();
    this._router.navigate(['error']);
  }
}
