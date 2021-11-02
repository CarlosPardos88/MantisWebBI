import { RangoHorario } from '../models/rangohorario.model';
import { IProceso } from '../procesos/services/procesos.service';
import { Time } from '@angular/common'

export function GetRangoHorarioFromProceso(proceso: IProceso): RangoHorario {
    if(proceso.OPE_SistemaFuente.length > 0){
        let rango: RangoHorario;

        let fuentehorafinmayor;
        let fuentehorainimenor;
    
        let fuentehorainimenorN;
        let fuentehorafinmayorN;
        //si solo existe una fuente
        if(proceso.OPE_SistemaFuente.length == 1){
            if(proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Inicio > proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Fin){
            fuentehorafinmayor = proceso.OPE_SistemaFuente[0];
            fuentehorainimenor = proceso.OPE_SistemaFuente[0];
            }else if(proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Inicio < proceso.OPE_SistemaFuente[0].OPE_HorarioSistemaFuente[0].Hora_Fin){
            fuentehorainimenorN = proceso.OPE_SistemaFuente[0];
            fuentehorafinmayorN = proceso.OPE_SistemaFuente[0];
            }
        }else{
            //Fuentes con horario Fecha fin menor a fecha inicio
            let fuentesMayor = proceso.OPE_SistemaFuente.filter(
            f => f.OPE_HorarioSistemaFuente[0].Hora_Inicio > f.OPE_HorarioSistemaFuente[0].Hora_Fin
            );
    
            if(fuentesMayor.length > 1){
            //si contiene más de una fuente
            fuentehorafinmayor = fuentesMayor.reduce(function(prev, curr) {
                if(prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > prev.OPE_HorarioSistemaFuente[0].Hora_Fin && 
                curr.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Fin){
                return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
                }
            });
    
            fuentehorainimenor = fuentesMayor.reduce(function(prev, curr) {
                if(prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > prev.OPE_HorarioSistemaFuente[0].Hora_Fin && 
                curr.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Fin){
                return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
                }
            });
            }else{
            fuentehorafinmayor = fuentesMayor[0];
            fuentehorainimenor = fuentesMayor[0];
            }
    
            //Fuentes con horario normal
            let fuentesNormal = proceso.OPE_SistemaFuente.filter(
            f => (f.OPE_HorarioSistemaFuente[0].Hora_Inicio < f.OPE_HorarioSistemaFuente[0].Hora_Fin)
            );
    
            let fuentesNormal2;
            if(fuentesNormal.length > 0 && fuentesNormal != null){
            fuentesNormal2 = fuentesNormal.filter(
                f => (f.OPE_HorarioSistemaFuente[0].Hora_Inicio+'' != '00:00:00' && f.OPE_HorarioSistemaFuente[0].Hora_Fin+'' != '23:59:00')
            );
            
            if(fuentesNormal2.length > 1 && fuentesNormal2 != null){
                fuentehorafinmayorN = fuentesNormal2.reduce(function(prev, curr) {
                if(prev.OPE_HorarioSistemaFuente[0].Hora_Inicio < prev.OPE_HorarioSistemaFuente[0].Hora_Fin && 
                    curr.OPE_HorarioSistemaFuente[0].Hora_Inicio < curr.OPE_HorarioSistemaFuente[0].Hora_Fin){
                    return prev.OPE_HorarioSistemaFuente[0].Hora_Fin < curr.OPE_HorarioSistemaFuente[0].Hora_Fin ? prev : curr;
                }
                });
                
                fuentehorainimenorN = fuentesNormal2.reduce(function(prev, curr) {
                if(prev.OPE_HorarioSistemaFuente[0].Hora_Inicio < prev.OPE_HorarioSistemaFuente[0].Hora_Fin && 
                curr.OPE_HorarioSistemaFuente[0].Hora_Inicio < curr.OPE_HorarioSistemaFuente[0].Hora_Fin){
                return prev.OPE_HorarioSistemaFuente[0].Hora_Inicio > curr.OPE_HorarioSistemaFuente[0].Hora_Inicio ? prev : curr;
                }
            });
            }else{
                fuentehorainimenorN = fuentesNormal2[0];
                fuentehorafinmayorN = fuentesNormal2[0];
            }
            }
        }
    
        let flagA : Boolean = false;
        let flagN : Boolean = false;
    
        let horafinA : Time;
        if(fuentehorafinmayor){
            horafinA = fuentehorafinmayor.OPE_HorarioSistemaFuente[0].Hora_Fin;
        }
    
        let horainiA : Time;
        if(fuentehorainimenor){
            horainiA = fuentehorainimenor.OPE_HorarioSistemaFuente[0].Hora_Inicio;
        }
    
        let horafinN : Time;
        if(fuentehorafinmayorN){
            horafinN = fuentehorafinmayorN.OPE_HorarioSistemaFuente[0].Hora_Fin;
        }
    
        let horainiN : Time;
        if(fuentehorainimenorN){
            horainiN = fuentehorainimenorN.OPE_HorarioSistemaFuente[0].Hora_Inicio;
        }
    
        if(horafinA != null && horainiA != null){
            flagA = true;
        };
    
        if(horafinN != null && horainiN != null){
            flagN = true;
        };
    
        //si es horario Normal o Anormal o un mix de horarios
        let Hora_Inicio, Hora_Fin;

        if(flagA==true && flagN==false){
            Hora_Inicio = horainiA;
            Hora_Fin = horafinA;
        }else if(flagN==true && flagA==false){
            Hora_Inicio = horainiN;
            Hora_Fin = horafinN;
        }else if(flagA==true && flagN==true){
            if(horainiA >= horainiN && horafinA <= horafinN){
                Hora_Inicio = horainiA;
                Hora_Fin = horafinN;
            }else if(horainiA <= horainiN && horafinA >= horafinN){
                Hora_Inicio = horainiN;
                Hora_Fin = horafinN;
            }
        }

        rango = {
            Hora_Inicio : Hora_Inicio,
            Hora_fin : Hora_Fin
        }
        
        return rango;
    }
}


export const ID_ESTADOPROCESO_VENCIDO = 3;
export const ID_ESTADOPROCESO_FALLIDO = 2;

export const ID_TIPOJUSTIFICACION_VENCIDO = 2;
export const ID_TIPOJUSTIFICACION_FALLIDO = 3;