import Vehiculo from "./vehiculo";

export default class Mantenimiento{
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private static readonly DURACION_MS = 24 * 60 * 60 * 1000;

    constructor(vehiculo: Vehiculo, fechaInicio: Date = new Date()){
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.vehiculo.setEstadoEnMantenimiento();
    }

    public horasTranscurridas(fechaActual: Date = new Date()): number{
        const ms = fechaActual.getTime() - this.fechaInicio.getTime();
        
        return ms / (1000 * 60 * 60);
    }

    public informeHorasTranscurridas(fechaActual: Date = new Date()): boolean{
        const msTranscurridos = fechaActual.getTime() - this.fechaInicio.getTime();
        return msTranscurridos >= Mantenimiento.DURACION_MS;
    }

    public finalizar(fechaActual: Date = new Date()): void{
        if(this.informeHorasTranscurridas(fechaActual)){
            this.vehiculo.setEstadoDisponible();
        }
    }
}