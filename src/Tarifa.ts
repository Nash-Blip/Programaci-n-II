import CalcularKilometros from "./CalcularKilometros";
import CalcularTemporada from "./CalcularTemporada";
import Reserva from "./Reserva";

export interface Tarifa{
    calcularTarifa(reserva: Reserva): number
    calcularKm: CalcularKilometros;
    calcularTemporada: CalcularTemporada;
}