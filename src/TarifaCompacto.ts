/*
Compacto: Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import { Temporada } from "./Temporada";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class TarifaCompacto implements Tarifa{
    private tarifaBase = 30
    calcularKm: CalcularKilometros = new CalcularKilometros();
    seteadorEstrategia: EstrategiaSegunTemporada = new EstrategiaSegunTemporada();

    public calcularTarifa(r: Reserva): number {
        const estrategia = this.seteadorEstrategia.setEstrategiaTemporada(r.getFechaInicio())
        return (estrategia.tarifaBaseTemporada(this.tarifaBase) * r.calcularCantidadDias()) + this.cargoAdicional(r)
    }

    private cargoAdicional(r: Reserva): number{
        if(this.calcularKm.promedioKmDiarios(r.getKmIniciales(), r.calcularCantidadDias()) > 100){
            return 0.15 * this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales())
        }else{
            return 0
        }
    }

}