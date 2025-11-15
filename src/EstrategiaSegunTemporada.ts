import { EstrategiaTemporada } from "./EstrategiaTemporada";
import EstrategiaTemporadaAlta from "./EstrategiaTemporadaAlta";
import EstrategiaTemporadaBaja from "./EstrategiaTemporadaBaja";
import EstrategiaTemporadaMedia from "./EstrategiaTemporadaMedia";
import { Temporada } from "./Temporada";
/**
 * Representa un seteador de estrategias para la tarifa base
 * @class
 */
export default class EstrategiaSegunTemporada{
    /**
     * Establece segun el mes la estrategia a utilizar por la clase tarifa
     * @param {Date} fecha 
     * @returns {EstrategiaSegunTemporada} retorna una instancia de la estrategia
     */
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