import CalcularKilometros from "./CalcularKilometros";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";
import Reserva from "./Reserva";

export interface Tarifa{
    calcularTarifa(reserva: Reserva): number
    calcularKm: CalcularKilometros;
    seteadorEstrategia: EstrategiaSegunTemporada;
}