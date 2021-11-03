import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { LoginService } from '../../services/login.service';
import { CryptoService } from '../../services/crypto.services';
import { Usuario  } from '../models/Usuario';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders: [ LoginService, CryptoService ],
})
export class LoginComponent {
  
  menus : Object[];
  user : string;
  perfil: string;

  usermenu: Object[] = [{
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
];
  username: string;
  menustring: string;
  menus2: any;
  jmenu:any;
  usuario:Usuario;

  constructor(
    private _router: Router,
    private _loadingService: TdLoadingService, 
    private _loginService: LoginService,
    private _cryptoService: CryptoService,
    private _dialogService: TdDialogService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: { username: string }) => {
      //let usuario = "";
      try {
        /*
        for (let i = 0; i < params.username.length; i++) {
          if (this.isEven(i)) {
            usuario = usuario + params.username[i];
          }
        }
        */
       
        this.username = params.username;
        
        if (params.username) {
          
          this.login();
        } else {
          this._router.navigate(['error']);
        }
      } catch (error) {
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
    this.jmenu = {"usr": this.username};
    
    this._loginService.GetMenuS3(this.jmenu).subscribe((menus: any) => {
   //   this._loginService.getMenu().subscribe((menus: any) => {
      this.menus2 = menus.menu.Childs;
      let menuCipher = this._cryptoService.encryptText(JSON.stringify(this.menus2));
      let usrCipher =  this._cryptoService.encryptText(JSON.stringify(this.username));
      let perfillCipher = this._cryptoService.encryptText(JSON.stringify(menus.perfil));
      sessionStorage.setItem("Menus", menuCipher.toString());
      sessionStorage.setItem("User", usrCipher.toString());
      sessionStorage.setItem("perfil", perfillCipher.toString());
    
      this._router.navigate(['']);
      this._loadingService.resolve();
      setTimeout(() => {
        this._loadingService.resolve('menus.load');
      }, 3000);
    }, (error: Error) => {

      this._loadingService.register();
      this._dialogService.openAlert({ message: 'Usuario sin acceso', closeButton: 'Aceptar' });
      this._router.navigate(['error']);
      this._loadingService.resolve();
      setTimeout(() => {
        this._loadingService.resolve();
      }, 500);
       /*
      this._loginService.getMenu().subscribe((menus: any) => {
        this.menus2 = menus.menu.Childs;
        console.log(this.username)
        let menuCipher = this._cryptoService.encryptText(JSON.stringify(this.menus2));
        let usrCipher = this._cryptoService.encryptText(JSON.stringify(this.username));
        let perfillCipher = this._cryptoService.encryptText(JSON.stringify(menus.perfil));
        //this.user = this.username;
        // this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
        sessionStorage.setItem("Menus", menuCipher.toString());
        sessionStorage.setItem("User", usrCipher.toString());
        sessionStorage.setItem("perfil", perfillCipher.toString());
        this._router.navigate(['']);
        this._loadingService.resolve();
        setTimeout(() => {
          this._loadingService.resolve('menus.load');
        }, 3000);
       
        this._router.navigate(['']);
        if (sessionStorage.getItem('Menus')){
          var mcipher = this._cryptoService.decryptText(sessionStorage.getItem('Menus'));
          this.user = this._cryptoService.decryptText(sessionStorage.getItem('User').toString()).replace(/['"]+/g, '');
          var json = JSON.parse(mcipher.toString());
          this.menus = json;
    
          var perfilcipher = this._cryptoService.decryptText(sessionStorage.getItem('perfil'));
          var perfilDec = JSON.parse(perfilcipher.toString());

          this.perfil = this.username;
          console.log(usrCipher);
          console.log(perfillCipher);
        }else{
          sessionStorage.removeItem('Menus');
          sessionStorage.removeItem('User');
          sessionStorage.clear();
          this._router.navigate(['/error']);
        }
        this._loadingService.resolve();
        
        setTimeout(() => {
          this._loadingService.resolve('menus.load');
        },3000);
        
      });
      */
    },
    );
  }
}