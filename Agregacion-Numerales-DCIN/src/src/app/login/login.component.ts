import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { LoginService } from '../../services/login.service';
import { CryptoService } from '../../services/crypto.services';


@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [ LoginService, CryptoService ],
})
export class LoginComponent {

  username: string;
  menustring: string;
  menus2: any;
  jmenu:any;

  constructor(
    private _router: Router,
    private _loadingService: TdLoadingService, 
    private _loginService: LoginService,
    private _cryptoService: CryptoService,
    private _dialogService: TdDialogService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    this._route.params.subscribe((params: {username: string}) => {
      let usuario = "";
      try{
        for (let i = 0; i < params.username.length; i++){
          if(this.isEven(i)){
            usuario = usuario+params.username[i];
          }
        }
        this.username = usuario;
        if (this.username) {
          this.login();
        }else{
			this._router.navigate(['error']);
		}
      }catch(error){
        this._router.navigate(['error']);
      }
    });
  }

  isOdd(n) {
    return Math.abs(n % 2) == 1;
  }

  isEven(n) {
    return n % 2 == 0;
  }

  login(): void {
    this._loadingService.register();
    this.jmenu = {"usr":this.username};
    
    // this._loginService.GetMenuS3(this.jmenu).subscribe((menus: any) => {
    this._loginService.getMenu().subscribe((menus: any) => {
      this.menus2 = menus.menu.Childs;
      let menuCipher = this._cryptoService.encryptText(JSON.stringify(this.menus2));
      let usrCipher = this._cryptoService.encryptText(JSON.stringify(this.username));
      let perfillCipher = this._cryptoService.encryptText(JSON.stringify(menus.perfil));

      sessionStorage.setItem("Menus", menuCipher.toString());
      sessionStorage.setItem("User", usrCipher.toString());
      sessionStorage.setItem("perfil", perfillCipher.toString());

      this._router.navigate(['']);
      this._loadingService.resolve();
      setTimeout(() => {
        this._loadingService.resolve('menus.load');
      }, 750);
    }, (error: Error) => {
      this._loginService.getMenu().subscribe((menus: any) => {
        this.menus2 = menus.menu.Childs;

        let menuCipher = this._cryptoService.encryptText(JSON.stringify(this.menus2));
        let usrCipher = this._cryptoService.encryptText(JSON.stringify(this.username));
        let perfillCipher = this._cryptoService.encryptText(JSON.stringify(menus.perfil));

        sessionStorage.setItem("Menus", menuCipher.toString());
        sessionStorage.setItem("User", usrCipher.toString());
        sessionStorage.setItem("perfil", perfillCipher.toString());

        this._router.navigate(['']);
        this._loadingService.resolve();

        setTimeout(() => {
          this._loadingService.resolve('menus.load');
        }, 750);
      });/*
      this._loadingService.register();
      this._dialogService.openAlert({message: 'Usuario sin acceso', closeButton :'Aceptar'});
      this._router.navigate(['error']);
      this._loadingService.resolve();
      setTimeout(() => {
        this._loadingService.resolve();
      }, 500);*/
    },
    );
  }
}