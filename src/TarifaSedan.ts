/*
Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import { Temporada } from "./Temporada";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class TarifaSedan implements Tarifa{
    private tarifaBase = 50
    calcularKm: CalcularKilometros = new CalcularKilometros();
    seteadorEstrategia: EstrategiaSegunTemporada = new EstrategiaSegunTemporada();

    public calcularTarifa(r: Reserva): number{
        const estrategia = this.seteadorEstrategia.setEstrategiaTemporada(r.getFechaInicio())

        return (estrategia.tarifaBaseTemporada(this.tarifaBase) * 
        r.calcularCantidadDias()) + this.calcularKm.calcularKmTotales(r.getKmIniciales(), 
        r.getKmFinales()) * 0.2
    }

}