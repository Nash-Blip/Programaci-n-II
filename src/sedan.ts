import Vehiculo from "./vehiculo";
import TarifaSedan from "./TarifaSedan";

export default class Sedan extends Vehiculo{
    constructor(){
        super(new TarifaSedan(), new DatosMantenimiento());
        this.tarifaBase = 50;
    }
}