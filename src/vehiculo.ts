import {EstadoVehiculo} from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";

/**
 * Clase abstracta que representa un vehículo.
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
    constructor(){
        this.numMatricula = 0;
        this.kilometro = 0;
        this.tarifaBase = 0;
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.logicaTarifa = undefined as unknown as Tarifa;
        this.datosMantenimiento = new DatosMantenimiento(0, new Date(), 0);
        this.datosEstadistica = new DatosEstadistica();
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
     * Establece la cantidad de kilometros recorridos.
     * @param {number} value - Kilometros recorridos por el vehículo. 
     */
    public setKilometro(value: number): void {
        this.kilometro = value;
    }

    /**
     * Retorna los kilometros recorridos del vehículo.
     * @returns {number} kilometro - Kilometros recorridos por el vehículo.
     */
    public getKilometro(): number {
        return this.kilometro;
    }

    /**
     * Establece que el vehículo esta disponible.
     */
    public setEstadoDisponible(): void {
        this.estado = EstadoVehiculo.DISPONIBLE;
    }

    /**
     * Establece que el vehículo esta en alquiler.
     */
    public setEstadoEnAlquiler(): void {
        this.estado = EstadoVehiculo.EN_ALQUILER;
    }

    /**
     * Establece que el vehículo esta en mantenimiento.
     */
    public setEstadoEnMantenimiento(): void {
        this.estado = EstadoVehiculo.EN_MANTENIMIENTO;
    }

    /**
     * Establece que el vehículo necesita limpieza.
     */
    public setEstadoNecesitaLimpieza(): void {
        this.estado = EstadoVehiculo.NECESITA_LIMPIEZA;
    }

    /**
     * Retorna el estado del vehículo.
     * @returns {EstadoVehiculo} estado - El estado actual del vehículo.
     */
    public getEstado(): EstadoVehiculo {
        return this.estado;
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
     * Establece los datos para gestionar el mantenimiento del vehícuol.
     * @param {DatosMantenimiento} datos - Los datos de mantenimiento. 
     */
    public setDatosMantenimiento(datos: DatosMantenimiento): void{
        this.datosMantenimiento = datos;
    }

    /**
     * Retorna los datos para gestionar el mantenimiento del vehículo.
     * @returns {DatosMantenimiento} datosMantenimiento - Los datos de mantenimiento del vehículo.
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