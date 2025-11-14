/*
Tarifa base de $80 por día. Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler.
*/

import { Tarifa } from "./Tarifa";
import CalcularKilometros from "./CalcularKilometros";
import Reserva from "./Reserva";
import CalcularTemporada from "./EstrategiaSegunTemporada";
import EstrategiaSegunTemporada from "./EstrategiaSegunTemporada";
import { EstrategiaTemporada } from "./EstrategiaTemporada";

export default class TarifaSuv implements Tarifa{
    private tarifaBase = 80
    private precioSeguro = 15
    calcularKm: CalcularKilometros = new CalcularKilometros();
    seteadorEstrategia: EstrategiaSegunTemporada = new EstrategiaSegunTemporada();

    public calcularTarifa(r: Reserva): number{
        const estrategia = this.seteadorEstrategia.setEstrategiaTemporada(r.getFechaInicio())
        return (estrategia.tarifaBaseTemporada(this.tarifaBase) * r.calcularCantidadDias()) + this.calcularSeguro(r) + this.cargoAdicional(r)
    }

    private superaronKm(r: Reserva): boolean{
        return this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) > 500
    }

    private calcularSeguro(r: Reserva): number{
        return r.calcularCantidadDias() * this.precioSeguro
    }

    private cargoAdicional(r: Reserva): number{
        if(this.superaronKm(r)){
            return this.calcularKm.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) * 0.25
        }else{
            return 0
        }
    }

}