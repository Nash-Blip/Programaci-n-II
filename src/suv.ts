import Vehiculo from "./vehiculo";
import TarifaSuv from "./TarifaSuv";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";

export default class SUV extends Vehiculo{
    constructor(){
        super();
        this.tarifaBase = 80;
        this.logicaTarifa = new TarifaSuv()
    }
}
