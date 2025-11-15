import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class EstrategiaTemporadaBaja implements EstrategiaTemporada{
    tarifaBaseTemporada(tarifaBase: number): number {
        return tarifaBase * 0.9
    }
}