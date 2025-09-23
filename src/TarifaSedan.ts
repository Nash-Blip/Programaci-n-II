/*
Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import { Tarifa } from "./Tarifa";
import Reserva from "./Reserva";

export default class TarifaSedan extends Tarifa{

    constructor(){
        super();
        this.tarifaBase = 50
    }

    public calculoTarifa(r: Reserva): number{
        return r.getKmTotales() * 0.2
    }

    calcularReserva(r: Reserva): number {
        return this.getTarifaBase() + this.calculoTarifa(r)
    }
}