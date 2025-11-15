import { EstrategiaTemporada } from "./EstrategiaTemporada";
import EstrategiaTemporadaAlta from "./EstrategiaTemporadaAlta";
import EstrategiaTemporadaBaja from "./EstrategiaTemporadaBaja";
import EstrategiaTemporadaMedia from "./EstrategiaTemporadaMedia";
import { Temporada } from "./Temporada";

export default class EstrategiaSegunTemporada{
    public setEstrategiaTemporada(fecha: Date): EstrategiaTemporada{
        const mes = fecha.getMonth();

        if([11,0,1].includes(mes)){
            return new EstrategiaTemporadaAlta();
        }else if([5,6,7].includes(mes)){
            return new EstrategiaTemporadaBaja();
        }else{
            return new EstrategiaTemporadaMedia();
        }
    }
}