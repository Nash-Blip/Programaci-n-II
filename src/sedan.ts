import Vehiculo from "./vehiculo";
import TarifaSedan from "./TarifaSedan";
import EstadoVehiculo from "./estadoVehiculo";
import StateDisponible from "./stateVehiculos/disponible";

/**
 * Clase concreta que representa un vehículo de tipo Sedan 
 */
export default class Sedan extends Vehiculo{
    /**
     * Crea una instancia de la clase Compacto
     * Hereda los atributos y metodos de la clase Vehiculo.
     * Inicializa la tarifa base en su respectivo valor (50) y se le asigna la correcta lógica para calcular la tarifa total 
     */
    constructor(estado: EstadoVehiculo){
        super(estado);
        this.tarifaBase = 50;
        this.logicaTarifa = new TarifaSedan()
    }
}