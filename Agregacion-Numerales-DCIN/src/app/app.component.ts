import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agregacion-numerales-dcin';

  constructor(private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer, private bnIdle: BnNgIdleService,private _router: Router) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'logobank',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logobank.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));    
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));

    }
    ngOnInit(): void {
      this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
            sessionStorage.removeItem('Menus');
            sessionStorage.removeItem('User');
            sessionStorage.clear();
            this._router.navigate(['/error']);  
        }
      });
    }
}
