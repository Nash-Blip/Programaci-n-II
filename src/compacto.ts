import Vehiculo from "./vehiculo";
import TarifaCompacto from "./TarifaCompacto";

export default class Compacto extends Vehiculo{
    constructor(){
        super(new TarifaCompacto());
        this.tarifaBase = 30;
    }
}