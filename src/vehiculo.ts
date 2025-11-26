import EstadoVehiculo from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";
import StateDisponible from "./stateVehiculos/disponible";
/**
 * Clase abstracta que representa un vehículo dentro del sistema.
 * 
 * Modela el estado, kilometraje, tarifa, estadísticas y mantenimiento
 */
export default abstract class Vehiculo{
    private numMatricula: number;
    private estado: EstadoVehiculo;
    private kilometro: number;
    protected tarifaBase: number;
    protected logicaTarifa: Tarifa;
    protected datosMantenimiento: DatosMantenimiento;
    public datosEstadistica: DatosEstadistica;

    /**
     * Crea una instancia de la clase vehículo,
     * inicializando la matricula, el kilometraje, la tarifa base y el estado del vehículo,
     * así como la lógica para calcular la tarifa total y gestionar el mantenimiento y la estadistica.  
     */
    constructor(estado: EstadoVehiculo){
        this.numMatricula = 0;
        this.kilometro = 0;
        this.tarifaBase = 0;
        this.estado = estado;
        this.logicaTarifa = undefined as unknown as Tarifa;
        this.datosMantenimiento = new DatosMantenimiento(0, new Date(), 0);
        this.datosEstadistica = new DatosEstadistica();
    }

    public setEstado(estado: EstadoVehiculo): void {
        this.estado = estado;
    }

    /**
     * Establece la matricula del vehículo.
     * @param {number} value - La matricula del vehículo.
     */
    public setNumMatricula(value: number): void {
        this.numMatricula = value;
    }
    
    /**
     * Retorna la matricula del vehículo.
     * @returns {number} numMatricula - La matricula del vehículo.
     */
    public getNumMatricula(): number {
        return this.numMatricula;
    }
    /**
     * Establece el kilometraje del vehículo.
     * @param {number} value Nuevo kilometraje.
     */
    public setKilometro(value: number): void {
        this.kilometro = value;
    }
    /**
     * Obtiene el kilometraje actual.
     * @returns {number} Kilometraje del vehículo.
     */
    public getKilometro(): number {
        return this.kilometro;
    }
    /**
     * Establece la tarifa base del vehículo.
     * @param {number} value - La tarifa base a establecer.
     */
    public setTarifaBase(value: number): void {
        this.tarifaBase = value;
    }

    /**
     * Retorna la tarifa base del vehículo.
     * @returns {number} tarifaBase - La tarifa base del vehículo.
     */
    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    /**
     * Establece la lógica a seguir para calcular la tarifa total
     * @param {Tarifa} logicaTarifa - La lógica a seguir para calcular la tarifa.
     */
    public setLogicaTarifa(logicaTarifa: Tarifa): void {
        this.logicaTarifa = logicaTarifa;        
    }

    /**
     * Retorna la lógica para calcular la tarifa.
     * @returns {Tarifa} logicaTarifa - La lógica a seguir para calcular la tarifa.
     */
    public getLogicaTarifa(): Tarifa {
        return this.logicaTarifa;
    }
    /**
     * Establece los datos de mantenimiento del vehículo.
     * @param {DatosMantenimiento} datos Nuevos datos de mantenimiento.
     */
    public setDatosMantenimiento(datos: DatosMantenimiento): void{
        this.datosMantenimiento = datos;
    }
    /**
     * Obtiene los datos de mantenimiento del vehículo.
     * @returns {DatosMantenimiento} Información de mantenimiento.
     */
    public getDatosMantenimiento(): DatosMantenimiento {
        return this.datosMantenimiento;
    }

    /**
     * Establece los datos para gestionar la estadística.
     * @param {DatosEstadistica} datos - Los datos estadisticos del vehículo.
     */
    public setDatosEstadistica(datos: DatosEstadistica): void {
        this.datosEstadistica = datos;
    }

    /**
     * Retorna los datos del vehículo para gestionar la estadística.
     * @returns {DatosEstadistica} datosEstadistica - Las datos estadísticos del vehículo.
     */
    public getDatosEstadistica(): DatosEstadistica {
        return this.datosEstadistica;
    }
}