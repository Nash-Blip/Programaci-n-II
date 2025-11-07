import {EstadoVehiculo} from "./estadoVehiculo";
import DatosMantenimiento from "./datosMantenimiento";

export default abstract class Vehiculo{
    constructor(private numMatricula: number, 
    private marcaAuto: string, 
    private kilometro: number, 
    private estado: EstadoVehiculo,
    private datosMantenimiento: DatosMantenimiento,
    private datosEstadistica: DatosEstadistica){
        this.estado = EstadoVehiculo.DISPONIBLE;
    }

    public setNumMatricula(value: number): void{
        this.numMatricula = value;
    }
    
    public getNumMatricula(): number{
        return this.numMatricula;
    }

    public setMarcaAuto(value: string): void{
        this.marcaAuto = value;
    }

    public getMarcaAuto(): string{
        return this.marcaAuto;
    }

    public setKilometro(value: number): void{
        this.kilometro = value;
    }

    public getKilometro(): number{
        return this.kilometro;
    }

    public setEstadoDisponible(): void{
        this.estado = EstadoVehiculo.DISPONIBLE;
    }

    public setEstadoEnAlquiler(): void{
        this.estado = EstadoVehiculo.EN_ALQUILER;
    }

    public setEstadoEnMantenimiento(): void{
        this.estado = EstadoVehiculo.EN_MANTENIMIENTO;
    }

    public setEstadoNecesitaLimpieza(): void{
        this.estado = EstadoVehiculo.NECESITA_LIMPIEZA;
    }

    public getEstado(): EstadoVehiculo {
        return this.estado;
    }

    public setDatosMantenimiento(datos: DatosMantenimiento): void{
        this.datosMantenimiento = datos;
    }

    public getDatosMantenimiento(): DatosMantenimiento{
        return this.datosMantenimiento;
    }
}