import {EstadoVehiculo} from "./estadoVehiculo";
import { Tarifa } from "./Tarifa";
import DatosMantenimiento from "./datosMantenimiento";
import DatosEstadistica from "./datosEstadistica";
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

    constructor(){
        this.numMatricula = 0;
        this.kilometro = 0;
        this.tarifaBase = 0;
        this.estado = EstadoVehiculo.DISPONIBLE;
        this.logicaTarifa = undefined as unknown as Tarifa;
        this.kilometro = 0;
        this.tarifaBase = 0;
        this.datosMantenimiento = new DatosMantenimiento(0, new Date(), 0);
        this.datosEstadistica = new DatosEstadistica();
    }
    /**
     * Establece el número de matrícula.
     * @param {number} value Nuevo número de matrícula.
     */
    public setNumMatricula(value: number): void {
        this.numMatricula = value;
    }
    /**
     * Retorna el número de matrícula.
     * @returns {number} Número de matrícula.
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
    /** Cambia el estado del vehículo a DISPONIBLE. */
    public setEstadoDisponible(): void {
        this.estado = EstadoVehiculo.DISPONIBLE;
    }
    /** Cambia el estado del vehículo a EN_ALQUILER. */
    public setEstadoEnAlquiler(): void {
        this.estado = EstadoVehiculo.EN_ALQUILER;
    }
    /** Cambia el estado del vehículo a EN_MANTENIMIENTO. */
    public setEstadoEnMantenimiento(): void {
        this.estado = EstadoVehiculo.EN_MANTENIMIENTO;
    }
    /** Cambia el estado del vehículo a NECESITA_LIMPIEZA. */
    public setEstadoNecesitaLimpieza(): void {
        this.estado = EstadoVehiculo.NECESITA_LIMPIEZA;
    }
    /**
     * Obtiene el estado actual del vehículo.
     * @returns {EstadoVehiculo} Estado del vehículo.
     */
    public getEstado(): EstadoVehiculo {
        return this.estado;
    }
    /**
     * Obtiene la tarifa base.
     * @returns {number} Tarifa base del vehículo.
     */
    public getTarifaBase(): number {
        return this.tarifaBase;
    }
    /**
     * Define la estrategia de tarifa del vehículo
     * @param {Tarifa} logicaTarifa Estrategia de tarifa a aplicar.
     */
    public setLogicaTarifa(logicaTarifa: Tarifa): void {
        this.logicaTarifa = logicaTarifa;        
    }
    /**
     * Obtiene la estrategia de tarifa asociada.
     * @returns {Tarifa} Estrategia de tarifa.
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
     * Establece los datos estadísticos del vehículo.
     * @param {DatosEstadistica} datos Nuevos datos estadísticos.
     */
    public setDatosEstadistica(datos: DatosEstadistica): void {
        this.datosEstadistica = datos;
    }
    /**
     * Obtiene los datos estadísticos del vehículo.
     * @returns {DatosEstadistica} Datos estadísticos del vehículo.
     */
    public getDatosEstadistica(): DatosEstadistica {
        return this.datosEstadistica;
    }
}