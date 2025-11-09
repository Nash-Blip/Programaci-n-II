import { EstadoVehiculo } from "./estadoVehiculo";
import DatosMantenimiento from "./datosMantenimiento";
import { Tarifa } from "./Tarifa";
import DatosEstadistica from "./datosEstadistica";

export default abstract class Vehiculo{
    private numMatricula: number;
    private estado: EstadoVehiculo;
    private kilometro: number;
    protected tarifaBase: number;

    constructor(protected logicaTarifa: Tarifa, private datosMantenimiento: DatosMantenimiento, private datosEstadistica: DatosEstadistica){
        this.numMatricula = 0;
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.kilometro = 0;
        this.tarifaBase = 0;
    }

    public setNumMatricula(value: number): void {
        this.numMatricula = value;
    }
    
    public getNumMatricula(): number {
        return this.numMatricula;
    }

    public setKilometro(value: number): void {
        this.kilometro = value;
    }

    public getKilometro(): number {
        return this.kilometro;
    }

    public setEstadoDisponible(): void {
        this.estado = EstadoVehiculo.DISPONIBLE;
    }

    public setEstadoEnAlquiler(): void {
        this.estado = EstadoVehiculo.EN_ALQUILER;
    }

    public setEstadoEnMantenimiento(): void {
        this.estado = EstadoVehiculo.EN_MANTENIMIENTO;
    }

    public setEstadoNecesitaLimpieza(): void {
        this.estado = EstadoVehiculo.NECESITA_LIMPIEZA;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public getLogicaTarifa(): Tarifa {
        return this.logicaTarifa;
    }

    public setDatosMantenimiento(datos: DatosMantenimiento): void{
        this.datosMantenimiento = datos;
    }

    public getDatosMantenimiento(): DatosMantenimiento {
        return this.datosMantenimiento;
    }
}