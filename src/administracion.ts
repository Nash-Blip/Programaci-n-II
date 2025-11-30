import Vehiculo from "./vehiculo";
import Reserva from "./Reserva";
import {EstadoVehiculo} from "./estadoVehiculo";
import Disponibilidad from "./disponibilidad";
import Estadistica from "./estadistica";

/**
* Clase principal del sistema que gestiona vehículos, reservas,
* disponibilidad, mantenimiento y estadísticas.
* @class
*/
export default class Administracion{

    private vehiculos: Map<number, Vehiculo>;
    private controladorDeEstadistica: Estadistica;
    private vehiculosEnAlquiler: number;

    /**
    * Crea una instancia de la clase Administracion,
    * inicializando los mapas de vehículos, reservas y mantenimientos,
    * además de los controladores de disponibilidad y estadísticas.
    */
    constructor(){
        this.vehiculos = new Map();
        this.controladorDeEstadistica = new Estadistica();
        this.vehiculosEnAlquiler = 0;
    }

    /** Retorna la flota de vehículos. */
    public getVehiculos(): Map<number, Vehiculo> {
        return this.vehiculos;
    }

    
    /**
    * Procesa una reserva verificando disponibilidad y estado del vehículo.
    * @param {Reserva} r - Reserva a procesar.
    * @returns {boolean} True si la reserva puede realizarse, false si existe solapamiento.
    * @throws {Error} Si el vehículo no existe o no está disponible.
    */
    public procesarReserva(r: Reserva): boolean{
        if(r.getVehiculo().alquilar()){
            this.vehiculosEnAlquiler++;
        }
        return r.getVehiculo().alquilar();
    }

    /**
     * Recibe el vehiculo actualiza sus estadisticas y devuelve el precio de esta
     * @param {Reserva} r - Reserva a procesar.
     * @returns {number} Es el precio total de la reserva
     */
    public recibirVehiculo(r: Reserva): number{
        r.getVehiculo().devolver();
        this.vehiculosEnAlquiler--;
        const totalPrecioReserva = r.calcularPrecioReserva();
        r.getVehiculo().getDatosEstadistica().aumentarCantidadDeVecesAlquilado();
        r.getVehiculo().getDatosEstadistica().aumentarCostosMantenimiento(5000);
        r.getVehiculo().getDatosEstadistica().aumentarIngresosAlquiler(totalPrecioReserva);
        return totalPrecioReserva
    }
    /**
     * Obtiene un reporte de las estadisticas
     * @returns {string} es un string con el reporte de las estadisticas de los vehiculos de la flota
     */
    public recibirReporte(): string{
        return this.controladorDeEstadistica.generarReporte(this.vehiculos, this.vehiculosEnAlquiler);
    }
}