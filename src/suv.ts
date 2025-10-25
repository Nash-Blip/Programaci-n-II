import { EstadoVehiculo } from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";
import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{
    constructor(numMatricula: number, estado: EstadoVehiculo, datosMantenimiento: DatosMantenimiento, datosEstadistica: DatosEstadistica, kilometro: number, logicaTarifa: Tarifa, tarifaBase: number){
        super(numMatricula, estado, datosMantenimiento, datosEstadistica, kilometro, logicaTarifa, tarifaBase);
    }
}