import Vehiculo from "./vehiculo";
import CalcularKilometros from "./CalcularKilometros";

/**
 * Representa una reserva de un vehículo en la plataforma.
 * Contiene información sobre fechas, vehículo reservado
 * y kilometraje inicial y final.
 */
export default class Reserva {
    /**
     * Crea una nueva reserva.
     * @param {number} idReserva - Identificador único de la reserva.
     * @param {Date} fechaInicio - Fecha de inicio de la reserva.
     * @param {Date} fechaFinalizacion - Fecha de finalización de la reserva.
     * @param {Vehiculo} vehiculo - Vehículo reservado.
     * @param {number} kmIniciales - Kilometraje inicial del vehículo al inicio de la reserva.
     * @param {number} kmFinales - Kilometraje final del vehículo al finalizar la reserva.
     * @param {CalcularKilometros} calcularKilometros - Instancia para calcular kilómetros y promedios.
     */
    constructor(
        private idReserva: number,
        private fechaInicio: Date,
        private fechaFinalizacion: Date,
        private vehiculo: Vehiculo,
        private kmIniciales: number,
        private kmFinales: number,
        private calcularKilometros: CalcularKilometros = new CalcularKilometros()
    ) {}

    /** Devuelve el ID de la reserva. */
    public getIdReserva(): number {
        return this.idReserva;
    }

    /** Devuelve la fecha de inicio de la reserva. */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /** Devuelve la fecha de finalización de la reserva. */
    public getFechaFinalizacion(): Date {
        return this.fechaFinalizacion;
    }

    /** Devuelve el vehículo asociado a la reserva. */
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /** Devuelve el kilometraje inicial del vehículo. */
    public getKmIniciales(): number {
        return this.kmIniciales;
    }

    /** Devuelve el kilometraje final del vehículo. */
    public getKmFinales(): number {
        return this.kmFinales;
    }

    /**
     * Establece el kilometraje final del vehículo.
     * @param {number} km - Kilometraje final.
     */
    public setKmFinales(km: number): void {
        this.kmFinales = km;
    }

    /**
     * Calcula la cantidad de días que dura la reserva.
     * @throws {Error} Si la fecha de inicio es posterior a la fecha de finalización.
     * @returns {number} Cantidad de días de la reserva.
     */
    public calcularCantidadDias(): number {
        const diferencia = this.fechaFinalizacion.getTime() - this.fechaInicio.getTime();
        if (diferencia < 0) {
            throw new Error("La fecha de inicio no puede ser posterior a la fecha de finalización");
        }
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    }

    /**
     * Calcula el precio total de la reserva utilizando
     * la lógica de tarifa del vehículo.
     * @returns {number} Precio de la reserva.
     */
    public calcularPrecioReserva(): number {
        const kmTotales = this.calcularKilometros.calcularKmTotales(this.kmIniciales, this.kmFinales);
        const tarifa = this.vehiculo.getLogicaTarifa();
        return tarifa.calcularTarifa(this);
    }
}