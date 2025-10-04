import { ESTADO_VEHICULO } from "./estado-vehiculo";
import { Tarifa } from "./Tarifa";
import { Vehiculo } from "./vehiculo";

export default class Sedan extends Vehiculo{
    constructor(numMatricula: number, estado: ESTADO_VEHICULO, kilometro: number, logicaTarifa: Tarifa){
        super(numMatricula, estado, kilometro, logicaTarifa);
    }
}