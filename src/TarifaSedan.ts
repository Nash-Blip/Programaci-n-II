/*
Tarifa base de $50 por día. Aplica un cargo de $0.20 por cada kilómetro
recorrido, sin límite diario.
*/

import { Tarifa } from "./Tarifa";
import Reserva from "./Reserva";

export default class TarifaSedan implements Tarifa{

    private tarifaBase = 50

    public calcularTarifa(r: Reserva): number{
        return r.calculadoraKilometros.calcularKmTotales(r.getKmIniciales(), r.getKmFinales()) * 0.2
    }

}