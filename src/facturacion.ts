import Reserva from "./Reserva";
import Disponibilidad from "./disponibilidad";

export default class Facturacion {
    private static readonly EXTRA_MANTENIMIENTO = 5000;
    private disponibilidad: Disponibilidad;

    constructor() {
        this.disponibilidad = new Disponibilidad();
    }

    private calcularMontoBase(reserva: Reserva): number {
        const vehiculo = reserva.getVehiculo();
        return vehiculo.getLogicaTarifa().calcularTarifa(reserva);
    }

    private calcularExtraPorMantenimiento(reserva: Reserva): number {
        if (this.disponibilidad.necesitaMantenimiento(reserva)) {
            return Facturacion.EXTRA_MANTENIMIENTO;
        }
        return 0;
    }

    public calcularMontoFinal(reserva: Reserva): number {
        const base = this.calcularMontoBase(reserva);
        const extra = this.calcularExtraPorMantenimiento(reserva);
        return base + extra;
    }
}