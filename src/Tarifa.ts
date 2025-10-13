import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";

export interface Tarifa{
    calcularTarifa(reserva: Reserva): number
    calcularKm: CalcularKilometros;
}