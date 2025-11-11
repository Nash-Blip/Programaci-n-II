import Vehiculo from "./vehiculo";
import TarifaSedan from "./TarifaSedan";
import DatosEstadistica from "./datosEstadistica";
import DatosMantenimiento from "./datosMantenimiento";

export default class Sedan extends Vehiculo{
    constructor(){
        super(new TarifaSedan(), new DatosMantenimiento(0, new Date(), 0), new DatosEstadistica());
        this.tarifaBase = 50;
    }
}