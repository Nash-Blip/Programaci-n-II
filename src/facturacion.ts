import Reserva from "./Reserva";
import Disponibilidad from "./disponibilidad";

/**
 * Clase encargada de calcular el monto final de una reserva,
 * teniendo en cuenta la tarifa base del vehículo y un posible
 * recargo por mantenimiento.
 */
export default class Facturacion {

    /**
     * Monto adicional que se cobra si el vehículo requiere mantenimiento.
     * @type {number}
     * @readonly
     * @private
     */
    private static readonly EXTRA_MANTENIMIENTO = 5000;

    /**
     * Maneja la lógica relacionada con la disponibilidad y mantenimiento del vehículo.
     * @type {Disponibilidad}
     * @private
     */
    private disponibilidad: Disponibilidad;

    /**
     * Crea una instancia de Facturacion e inicializa la lógica de disponibilidad.
     */
    constructor() {
        this.disponibilidad = new Disponibilidad();
    }

    /**
     * Calcula el monto base de la reserva utilizando la lógica
     * de tarifa del vehículo asociado.
     *
     * @param {Reserva} reserva - La reserva a facturar.
     * @returns {number} El monto base calculado.
     * @private
     */
    private calcularMontoBase(reserva: Reserva): number {
        const vehiculo = reserva.getVehiculo();
        return vehiculo.getLogicaTarifa().calcularTarifa(reserva);
    }

    /**
     * Determina si se debe aplicar un extra por mantenimiento
     * y lo retorna.
     *
     * @param {Reserva} reserva - La reserva a evaluar.
     * @returns {number} El monto extra a cobrar (0 o EXTRA_MANTENIMIENTO).
     * @private
     */
    private calcularExtraPorMantenimiento(reserva: Reserva): number {
        if (this.disponibilidad.necesitaMantenimiento(reserva)) {
            return Facturacion.EXTRA_MANTENIMIENTO;
        }
        return 0;
    }

    /**
     * Calcula el monto final de la reserva sumando el monto base
     * y el posible extra por mantenimiento.
     *
     * @param {Reserva} reserva - La reserva a facturar.
     * @returns {number} El monto total final.
     */
    public calcularMontoFinal(reserva: Reserva): number {
        const base = this.calcularMontoBase(reserva);
        const extra = this.calcularExtraPorMantenimiento(reserva);
        return base + extra;
    }
}