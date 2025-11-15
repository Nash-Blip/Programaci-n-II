import { EstrategiaTemporada } from "./EstrategiaTemporada";
/**
 * representa la estrategia para la temporada alta
 * @class
 * @implements {EstrategiaTemporada}
 */
export default class EstrategiaTemporadaAlta implements EstrategiaTemporada{
    /**
     * Le aplica un aumento del 20% a la tarifa
     * @param {number} tarifaBase - Es la tarifa base que manda la logicaTarifa
     * @returns {number} es la tarifaBase con el bono de temporada alta
     */
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase * 1.2
    }
}