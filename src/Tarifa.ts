import Reserva from "./Reserva";

export interface Tarifa{
    calcularTarifa(reserva: Reserva): number
}