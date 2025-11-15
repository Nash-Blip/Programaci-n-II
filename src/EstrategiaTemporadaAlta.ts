import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class EstrategiaTemporadaAlta implements EstrategiaTemporada{
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase * 1.2
    }
}