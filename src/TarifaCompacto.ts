/*
Compacto: Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";
/**
 * Representa la tarifa aplicada a vehículos de tipo **Compacto**.
 * Implementa la lógica específica para calcular el costo total,
 *
 * @class
 * @implements {Tarifa}
 */
export default class TarifaCompacto implements Tarifa{
    private tarifaBase = 30
    calcularKm: CalcularKilometros = new CalcularKilometros();
    seteadorEstrategia: EstrategiaSegunTemporada = new EstrategiaSegunTemporada();

    /**
     * devuelve el precio de tarifa con la logica de los Compactos
     * @param @param {Reserva} r - La reserva desde la cual obtener fechas y kilometraje.
     * @returns {number} El costo total de la tarifa para la reserva.
     */
    public calcularTarifa(r: Reserva): number {
        const estrategia = this.seteadorEstrategia.setEstrategiaTemporada(r.getFechaInicio())
        return (estrategia.tarifaBaseTemporada(this.tarifaBase) * r.calcularCantidadDias()) + this.cargoAdicional(r)
    }

    /**
     * calcula un cargo adicional si el promedio de km diarios supero 100km
     * @private
     * @param {Reserva} r - La reserva asociada al vehículo.
     * @returns {number} El cargo adicional correspondiente (o 0 si no corresponde).
     */
    private cargoAdicional(r: Reserva): number{
        if(this.calcularKm.promedioKmDiarios(r.getKmIniciales(), r.calcularCantidadDias()) > 100){
            return 0.15 * this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales())
        }else{
            return 0
        }
    }

}