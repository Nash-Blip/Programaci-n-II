/*
Compacto: Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./CalcularTemporada";
import { Temporada } from "./Temporada";

export default class TarifaCompacto implements Tarifa{
    private tarifaBase = 30
    calcularKm: CalcularKilometros = new CalcularKilometros();
    calcularTemporada: CalcularTemporada = new CalcularTemporada()

    public calcularTarifa(r: Reserva): number {
        return (this.calcularTemporada.tarifaBaseTemporada(this.tarifaBase, r.getFechaInicio()) * r.calcularCantidadDias()) + this.cargoAdicional(r)
    }

    private cargoAdicional(r: Reserva): number{
        if(this.calcularKm.promedioKmDiarios(r.calcularCantidadDias()) > 100){
            return 0.15 * this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales())
        }else{
            return 0
        }
    }

}