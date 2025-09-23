/*
Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler.
*/

import { Tarifa } from "./Tarifa";
import Reserva from "./Reserva";

export default class TarifaSuv extends Tarifa{
    
    constructor(){

        super()
        this.tarifaBase = 80
    }

    public superaronKm(r: Reserva): boolean{
        return r.getKmTotales() > 500
    }

    public calculoTarifa(r: Reserva): number{
        if(this.superaronKm(r)){
            return r.getKmTotales() * 0.25
        }else{
            return 0
        }
    }

    public calcularSeguro(r: Reserva): number{
        return r.calcularCantidadDias() * 15
    }

    calcularReserva(r: Reserva): number {
        return this.getTarifaBase() + this.calculoTarifa(r) + this.calcularSeguro(r)
    }
}