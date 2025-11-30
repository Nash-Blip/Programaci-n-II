import EstadoEnAlquiler from "./EstadoEnAlquiler";
import { IEstado } from "./IEstados";
import Vehiculo from "./vehiculo";

export default class EstadoDisponible implements IEstado{
    private contexto: Vehiculo;
    constructor(c: Vehiculo){
        this.contexto = c;
    }

    alquilar(): boolean {
        this.contexto.setEstado(new EstadoEnAlquiler(this.contexto));
        return true;
    }

    devolver(): void {
        throw new Error('El vehiculo esta disponible: operacion sin sentido');
    }
}