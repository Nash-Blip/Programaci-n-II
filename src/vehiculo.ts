import { ESTADO_VEHICULO } from "./estado-vehiculo";
import { Tarifa } from "./Tarifa";

export abstract class Vehiculo{
    constructor(private numMatricula: number, private kilometro: number, private estado: ESTADO_VEHICULO, private logicaTarifa: Tarifa){
        this.estado = ESTADO_VEHICULO.DISPONIBLE;
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
        this.estado = ESTADO_VEHICULO.DISPONIBLE;
    }

    public setEstadoEnAlquiler(): void{
        this.estado = ESTADO_VEHICULO.EN_ALQUILER;
    }

    public setEstadoEnMantenimiento(): void{
        this.estado = ESTADO_VEHICULO.EN_MANTENIMIENTO;
    }

    public setEstadoNecesitaLimpieza(): void{
        this.estado = ESTADO_VEHICULO.NECESITA_LIMPIEZA;
    }

    public getEstado(): ESTADO_VEHICULO {
        return this.estado;
    }

    public calcularTarfia(){}
}