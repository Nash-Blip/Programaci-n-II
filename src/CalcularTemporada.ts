import { Temporada } from "./Temporada";

export default class CalcularTemporada{
    public ObtenerTemporada(fecha: Date): Temporada{
        const mes = fecha.getMonth();

        if([11,0,2].includes(mes)){
            return Temporada.ALTA;
        }else if([5,6,7].includes(mes)){
            return Temporada.BAJA
        }else{
            return Temporada.MEDIA
        }
    }

    public tarifaBaseTemporada(tarifaBase: number, fecha: Date): number {
        const temporada = this.ObtenerTemporada(fecha)
        switch(temporada){
            case Temporada.BAJA:
                return tarifaBase * 0.9
            case Temporada.MEDIA:
                return tarifaBase * 1.2
            case Temporada.ALTA:
                return tarifaBase
        }
  }
}