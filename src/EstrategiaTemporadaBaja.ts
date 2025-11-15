import { EstrategiaTemporada } from "./EstrategiaTemporada";
/**
 * representa la estrategia para la temporada baja
 * @class
 * @implements {EstrategiaTemporada}
 */
export default class EstrategiaTemporadaBaja implements EstrategiaTemporada{
    /**
     * Le aplica un descuento de 10% sobre la tarifaBase
     * @param {number} tarifaBase - Es la tarifa base que manda la logicaTarifa
     * @returns {number} es la tarifaBase con el bono de temporada baja
     */
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase * 0.9
    }
}