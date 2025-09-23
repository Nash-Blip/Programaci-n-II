import Reserva from "./Reserva";

export abstract class  Tarifa {

    protected tarifaBase:number;
    constructor() {
        this.tarifaBase = 0;
    }

    public getTarifaBase(): number{
        return this.tarifaBase
    }

    abstract calcularReserva(r: Reserva): number
    abstract calculoTarifa(r: Reserva): number
}