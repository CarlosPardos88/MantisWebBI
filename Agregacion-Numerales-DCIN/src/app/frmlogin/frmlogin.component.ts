import { Input, Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import * as echarts from 'echarts/lib/echarts';
import { FormBuilder, FormControl, FormGroup, Validators, Form} from '@angular/forms';
import { FormsModule, NgForm,  ReactiveFormsModule, NG_VALIDATORS  } from '@angular/forms';
import { HttpClientModule, HttpClient,HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutenticauserService, IUsuario } from '../../app/consultas/services/autenticauser.service';
import { TdLoadingService } from '@covalent/core/loading';
import { TdDialogService } from '@covalent/core/dialogs';
import { LoginService } from '../../services/login.service';
import { CryptoService } from '../../services/crypto.services';
import { Usuario  } from '../models/Usuario';


@Component({
  selector: 'app-frmlogin',
  templateUrl: './frmlogin.component.html',
  styleUrls: ['./frmlogin.component.scss'],
  viewProviders: [LoginService, CryptoService],
})
export class FrmloginComponent implements OnInit {
  @Input('master') masterName = 'Hola'; 
  username: string;
  menustring: string;
  menus2: any;
  jmenu: any;
  loggedIn: any;          
  loginForm = new FormGroup({
     usuario: new FormControl(''),
     pwd: new FormControl('')
  });
  usuario: Usuario;
  usarios: IUsuario;
  perfil: string;

  //public submitted: Boolean = false;
  //public error: {code: number, message: string} = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private srvAutenticaUser:AutenticauserService,  
    private _loadingService: TdLoadingService,
    private _loginService: LoginService,
    private _cryptoService: CryptoService,
    private _dialogService: TdDialogService,
    private _router: Router,
  ) { }

  ngOnInit(): void 
  {
      this.loginForm = this.formBuilder.group({
        usuario:   ['', Validators.required],
        pwd:   ['', Validators.required],
      });

  }

  
  submitLogin(form:any)
  {
    
    try
    {    
      this.usuario = new Usuario;
      this.usuario.usuario= form.value.usuario;
      this.usuario.Pass= form.value.pwd;
      
      if(form.value.usuario == '' && form.value.pwd == '')
      {
        alert('Por favor digite todos los campos!')
      }
      else if(form.value.usuario == '')
      {
        alert('Por favor digite el nombre del usuario!')
      }
      else if(form.value.pwd == '')
      {
        alert('Por favor digite la contraseña!')
      }
      else if (form.value.usuario != '' && form.value.pwd != ''){
        this.usarios = {
          usuario : form.value.usuario,
          pwd : form.value.pwd
         };
        this.srvAutenticaUser.postAutenticar(this.usarios)
        .subscribe(data=> {
         
         
          if(data == "Autenticado")
          {
            this.router.navigate(['/login',this.usuario.usuario]);
          } 
          else if (data == "Invalido"){
              alert("Usuario o contraseña incorrecta!")
          }
          else
          {
            alert("Error interno en el servidor " + data)
          }
          
       });
      }
     
    
    }
    catch (e)
    {
      alert('Se ha registrado un error desconocido '+e);
    }
  
  }



}
