<<<<<<< HEAD
import { ESTADO_VEHICULO } from "./estado-vehiculo";
import { Tarifa } from "./Tarifa";

export abstract class Vehiculo{
    constructor(private numMatricula: number, private kilometro: number, private estado: ESTADO_VEHICULO, private logicaTarifa: Tarifa){
        this.estado = ESTADO_VEHICULO.DISPONIBLE;
=======
import {EstadoVehiculo} from "./estadoVehiculo";

export default abstract class Vehiculo{
    constructor(private numMatricula: number, private marcaAuto: string, private kilometro: number, private estado: EstadoVehiculo){
        this.estado = EstadoVehiculo.DISPONIBLE;
>>>>>>> Branch_DiagramaEnu2
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

    public calcularTarfia(){}
}