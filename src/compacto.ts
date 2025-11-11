import Vehiculo from "./vehiculo";
import TarifaCompacto from "./TarifaCompacto";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";

export default class Compacto extends Vehiculo{
    constructor(){
        super();
        this.tarifaBase = 30;
        this.logicaTarifa = new TarifaCompacto();
    }
}