/*
Compacto: Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.
*/

import { Tarifa } from "./Tarifa";
import Reserva from "./Reserva";

export default class TarifaCompacto extends Tarifa{

    constructor(){
        super();
        this.tarifaBase = 30
    }

    public superoKmDiarios(r: Reserva): boolean{
        return r.getKmDiarios() > 100
        
    }

    public calculoTarifa(r: Reserva): number{
        if(this.superoKmDiarios(r)){
            return r.getKmTotales() * 0.15
        }else{
            return 0
        }
        
    }

    public calcularReserva(r: Reserva): number {
        return this.tarifaBase + this.calculoTarifa(r)
    }


    
}