import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class EstrategiaTemporadaMedia implements EstrategiaTemporada{
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase
    }
}