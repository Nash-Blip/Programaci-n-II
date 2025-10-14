/*
Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";

export default class TarifaSedan implements Tarifa{
    private tarifaBase = 50
    calcularKm: CalcularKilometros = new CalcularKilometros();

    public calcularTarifa(r: Reserva): number{
        return (this.tarifaBase * r.calcularCantidadDias()) + this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) * 0.2
    }

}