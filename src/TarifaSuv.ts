/*
Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";
/**
 * Representa la tarifa aplicada a vehículos de tipo **Suv**.
 * Implementa la lógica específica para calcular el costo total,
 *
 * @class
 * @implements {Tarifa}
 */
export default class TarifaSuv implements Tarifa{
    private tarifaBase = 80
    private precioSeguro = 15
    calcularKm: CalcularKilometros = new CalcularKilometros();
    seteadorEstrategia: EstrategiaSegunTemporada = new EstrategiaSegunTemporada();
    /**
     * devuelve el precio de tarifa con la logica de los Suv
     * @param @param {Reserva} r - La reserva desde la cual obtener fechas y kilometraje.
     * @returns {number} El costo total de la tarifa para la reserva.
     */
    public calcularTarifa(r: Reserva): number{
        const estrategia = this.seteadorEstrategia.setEstrategiaTemporada(r.getFechaInicio())
        return (estrategia.tarifaBaseTemporada(this.tarifaBase) * r.calcularCantidadDias()) + this.calcularSeguro(r) + this.cargoAdicional(r)
    }
    /**
     * Devuelve true si se superaron los 500km o false si no los superaron
     * @param {Reserva} r - La reserva asociada al vehículo.
     * @returns {boolean}El valor booleano que corresponde
     */
    private superaronKm(r: Reserva): boolean{
        return this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) > 500
    }
    /**
     * Calcula el precio total del seguro segun la cantidad de dias
     * @param {Reserva} r - La reserva asociada al vehículo.
     * @returns {number} el precio del seguro
     */
    private calcularSeguro(r: Reserva): number{
        return r.calcularCantidadDias() * this.precioSeguro
    }
    /**
     * calcula un cargo adicional si se superaron los 500km
     * @private
     * @param {Reserva} r - La reserva asociada al vehículo.
     * @returns {number} El cargo adicional correspondiente (o 0 si no corresponde).
     */
    private cargoAdicional(r: Reserva): number{
        if(this.superaronKm(r)){
            return this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) * 0.25
        }else{
            return 0
        }
    }

}