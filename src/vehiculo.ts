import {EstadoVehiculo} from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";

export default abstract class Vehiculo{
    private numMatricula: number;
    private estado: EstadoVehiculo;
    private kilometro: number;
    protected tarifaBase: number;

    constructor(protected logicaTarifa: Tarifa, protected datosMantenimiento: DatosMantenimiento, public datosEstadistica: DatosEstadistica){
        this.numMatricula = 0;
        this.kilometro = 0;
        this.tarifaBase = 0;
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.logicaTarifa = undefined as unknown as Tarifa;
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

    public setLogicaTarifa(logicaTarifa: Tarifa): void {
        this.logicaTarifa = logicaTarifa;        
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

    public setDatosEstadistica(datos: DatosEstadistica): void {
        this.datosEstadistica = datos;
    }

    public getDatosEstadistica(): DatosEstadistica {
        return this.datosEstadistica;
    }
}