import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService, RESTService } from '@covalent/http-deprec';
import { MOCK_API } from '../config/api.config';

import { map } from 'rxjs/operators';

@Injectable()
export class ItemsService extends RESTService<any> {

  constructor(private _http: HttpInterceptorService) {
    super(_http, {
      baseUrl: MOCK_API,
      path: '/items',
    });
  }

  staticQuery(): any {
    return this._http.get('data/items.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQuery1(): any {
    return this._http.get('data/itemApro.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQuery2(): any {
    return this._http.get('data/itemRecha.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQuery3(): any {
    return this._http.get('data/proveedores.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticQuery4(): any {
    return this._http.get('data/contratos.json').pipe(
      map((res: Response) => {
        return res.json();
      }),
    );
  }

  staticGet(id: string): any {
    return this._http.get('data/items.json').pipe(
      map((res: Response) => {
        let itemAp: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            itemAp = s;
          }
        });
        return itemAp;
      }),
    );
  }

  staticGet1(id: string): any {
    return this._http.get('data/itemApro.json').pipe(
      map((res: Response) => {
        let itemAp: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            itemAp = s;
          }
        });
        return itemAp;
      }),
    );
  }

  staticGet2(id: string): any {
    return this._http.get('data/itemRecha.json').pipe(
      map((res: Response) => {
        let itemRec: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            itemRec = s;
          }
        });
        return itemRec;
      }),
    );
  }
  staticGet3(id: string): any {
    return this._http.get('data/proveedores.json').pipe(
      map((res: Response) => {
        let itemProve: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            itemProve = s;
          }
        });
        return itemProve;
      }),
    );
  }

  staticGet4(id: string): any {
    return this._http.get('data/contratos.json').pipe(
      map((res: Response) => {
        let itemContra: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            itemContra = s;
          }
        });
        return itemContra;
      }),
    );
  }

}
