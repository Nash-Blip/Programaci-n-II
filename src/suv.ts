import Vehiculo from "./vehiculo";
import TarifaSuv from "./TarifaSuv";

export default class SUV extends Vehiculo{
    constructor(){
        super(new TarifaSuv());
        this.tarifaBase = 80;
    }
}