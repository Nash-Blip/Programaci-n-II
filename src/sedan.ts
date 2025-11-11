
import Vehiculo from "./vehiculo";
import TarifaSedan from "./TarifaSedan";
import DatosEstadistica from "./datosEstadistica";
import DatosMantenimiento from "./datosMantenimiento";

export default class Sedan extends Vehiculo{
    constructor(){
        super();
        this.tarifaBase = 50;
        this.logicaTarifa = new TarifaSedan()
    }
}
