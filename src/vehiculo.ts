import {EstadoVehiculo} from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";

export default abstract class Vehiculo{
    constructor(private numMatricula: number, private estado: EstadoVehiculo, private datosMantenimiento: DatosMantenimiento, private datosEstadistica: DatosEstadistica, private kilometro: number, private logicaTarifa: Tarifa, private tarifaBase: number){
        this.estado = EstadoVehiculo.DISPONIBLE;
    }

    public setNumMatricula(value: number): void{
        this.numMatricula = value;
    }
    public getNumMatricula(): number{
        return this.numMatricula;
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

    public setTarifaBase(): void {}
    
    public getTarifaBase(): number {
        return this.tarifaBase;
    }
}