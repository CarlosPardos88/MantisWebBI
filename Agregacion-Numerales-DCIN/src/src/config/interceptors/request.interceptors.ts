import { Injectable } from '@angular/core';
import { ITdHttpInterceptor, ITdHttpRESTOptionsWithBody } from '@covalent/http';

@Injectable()
export class RequestInterceptor implements ITdHttpInterceptor {

   handleOptions(options: ITdHttpRESTOptionsWithBody): ITdHttpRESTOptionsWithBody {
    return options;
  }
}