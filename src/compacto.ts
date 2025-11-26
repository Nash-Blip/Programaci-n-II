import Vehiculo from "./vehiculo";
import TarifaCompacto from "./TarifaCompacto";
import EstadoVehiculo from "./estadoVehiculo";

/**
 * Clase concreta que representa un vehículo de tipo Compacto 
 */
export default class Compacto extends Vehiculo{
    /**
     * Crea una instancia de la clase Compacto
     * Hereda los atributos y metodos de la clase Vehiculo.
     * Inicializa la tarifa base en su respectivo valor (30) y se le asigna la correcta lógica para calcular la tarifa total 
     */
    constructor(estado: EstadoVehiculo){
        super(estado);
        this.tarifaBase = 30;
        this.logicaTarifa = new TarifaCompacto();
    }
}