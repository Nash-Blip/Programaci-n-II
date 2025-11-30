import EstadoDisponible from "./EstadoDisponible";
import EstadoEnAlquiler from "./EstadoEnAlquiler";
import { IEstado } from "./IEstados";
import Vehiculo from "./vehiculo";

export default class EstadoMantenimiento implements IEstado{
    private contexto: Vehiculo;
    private fechaInicio: Date;
    private costoMantenimiento = 5000;
    constructor(c: Vehiculo){
        this.contexto = c;
        this.fechaInicio = new Date();
    }

    alquilar(): boolean {
        if(this.horasTranscurridas(new Date()) > 24){
            this.contexto.getDatosMantenimiento().reiniciarDatos();
            this.contexto.getDatosEstadistica().aumentarCostosMantenimiento(this.costoMantenimiento);
            this.contexto.setEstado(new EstadoEnAlquiler(this.contexto));
            return true
        }else{
            throw new Error('El vehiculo se encuentra en mantenimiento no puede ser alquilado');
        }
    }

    devolver(): void {
        throw new Error('El vehiculo esta en mantenimiento: operacion sin sentido');
    }

    private horasTranscurridas(fechaActual: Date = new Date()): number{
        const ms = fechaActual.getTime() - this.fechaInicio.getTime();
        
        return ms / (1000 * 60 * 60);
    }

}