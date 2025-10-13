/*
Compacto: Tarifa base de $30 por día. Aplica un cargo de $0.15 por cada kilómetro
recorrido si se superan los 100 km por día de alquiler.
*/

import { Tarifa } from "./Tarifa";
import Reserva from "./Reserva";
import CalcularKilometros from "./CalcularKilometros";

export default class TarifaCompacto implements Tarifa{
    private tarifaBase = 30
    calcularKm: CalcularKilometros = new CalcularKilometros();

    public calcularTarifa(reserva: Reserva): number {
        return this.tarifaBase + this.cargoAdicional(reserva)
    }

    private cargoAdicional(r: Reserva): number{
        if(this.calcularKm.promedioKmDiarios(r.calcularCantidadDias()) > 100){
            return 0.15 * r.calculadoraKilometros.calcularKmTotales(r.getKmIniciales(), r.getKmFinales())
        }else{
            return 0
        }
    }

    
}