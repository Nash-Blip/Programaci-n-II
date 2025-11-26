import Vehiculo from "./vehiculo";
import TarifaSuv from "./TarifaSuv";
import EstadoVehiculo from "./estadoVehiculo";

/**
 * Clase concreta que representa un vehículo de tipo SUV 
 */
export default class SUV extends Vehiculo{
    /**
     * Crea una instancia de la clase SUV
     * Hereda los atributos y metodos de la clase Vehiculo.
     * Inicializa la tarifa base en su respectivo valor (80) y se le asigna la correcta lógica para calcular la tarifa total 
     */
    constructor(estado: EstadoVehiculo){
        super(estado);
        this.tarifaBase = 80;
        this.logicaTarifa = new TarifaSuv()
    }
}