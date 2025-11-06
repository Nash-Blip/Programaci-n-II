import Vehiculo from "./vehiculo";
import { EstadoVehiculo } from "./estadoVehiculo";

export default class Sedan extends Vehiculo{
    constructor(numMatricula: number, marcaAuto: string, kilemtro: number, estado: EstadoVehiculo){
        super(numMatricula, marcaAuto, kilemtro, estado);
    }
}