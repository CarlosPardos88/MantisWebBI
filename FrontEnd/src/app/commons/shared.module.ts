import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadoAprobacionPipe } from '../utils/estado-aprobacion.pipe';
import { HomologacionPipe } from '../utils/homologacion.pipe';

@NgModule({
    declarations: [
        EstadoAprobacionPipe,
        HomologacionPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        EstadoAprobacionPipe,
        HomologacionPipe
    ],
})

export class SharedModule { }
