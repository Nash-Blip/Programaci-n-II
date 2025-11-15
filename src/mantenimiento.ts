import Vehiculo from "./vehiculo";

/**
* Representa un proceso de mantenimiento de un vehículo.
* Bloquea el vehículo durante 24 horas y permite consultar si el tiempo ya finalizó.
* @class
*/
export default class Mantenimiento{
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private static readonly DURACION_MS = 24 * 60 * 60 * 1000;

    /**
    * Crea un nuevo mantenimiento para un vehículo.
    * @param {Vehiculo} vehiculo - Vehículo que entra en mantenimiento.
    * @param {Date} fechaInicio - Fecha de inicio del mantenimiento (por defecto, ahora).
    */
    constructor(vehiculo: Vehiculo, fechaInicio: Date = new Date()){
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.vehiculo.setEstadoEnMantenimiento();
    }

    /**
    * Calcula cuántas horas pasaron desde que inició el mantenimiento.
    * @param {Date} fechaActual - Fecha contra la cual se compara (por defecto, ahora).
    * @returns {number} Cantidad de horas transcurridas.
    */
    public horasTranscurridas(fechaActual: Date = new Date()): number{
        const ms = fechaActual.getTime() - this.fechaInicio.getTime();
        
        return ms / (1000 * 60 * 60);
    }

    /**
    * Indica si ya pasaron las 24 horas de mantenimiento.
    * @param {Date} fechaActual - Fecha actual para el cálculo.
    * @returns {boolean} True si las 24 horas ya transcurrieron.
    */
    public informeHorasTranscurridas(fechaActual: Date = new Date()): boolean{
        const msTranscurridos = fechaActual.getTime() - this.fechaInicio.getTime();
        return msTranscurridos >= Mantenimiento.DURACION_MS;
    }

    /**
    * Finaliza el mantenimiento si ya pasaron las 24 horas,
    * y vuelve el vehículo al estado DISPONIBLE.
    * @param {Date} fechaActual - Fecha actual para el cálculo.
    */
    public finalizar(fechaActual: Date = new Date()): void{
        if(this.informeHorasTranscurridas(fechaActual)){
            this.vehiculo.setEstadoDisponible();
        }
    }
}