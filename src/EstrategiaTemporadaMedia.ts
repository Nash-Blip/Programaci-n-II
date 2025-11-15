import { EstrategiaTemporada } from "./EstrategiaTemporada";
/**
 * representa la estrategia para la temporada media
 * @class
 * @implements {EstrategiaTemporada}
 */
export default class EstrategiaTemporadaMedia implements EstrategiaTemporada{
    /**
     * devuelve la tarifa sin ningun cambio
     * @param {number} tarifaBase - Es la tarifa base que manda la logicaTarifa
     * @returns {number} es la tarifaBase 
     */
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase
    }
}