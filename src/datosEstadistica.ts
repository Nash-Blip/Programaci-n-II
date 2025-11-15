/**
 * Representa los datos internos de los vehiculos para el calculo de estadistica
 */
export default class DatosEstadistica {
    private cantidadDeVecesAlquilado: number;
    private ingresosAlquiler: number;
    public costosMantenimiento: number;

    constructor(){
        this.cantidadDeVecesAlquilado = 0;
        this.ingresosAlquiler = 0;
        this.costosMantenimiento = 0;
    }
    /**
     * Aumenta la cantidad de veces que fue alquilado el vehiculo
     */
    public aumentarCantidadDeVecesAlquilado(): void {
        this.cantidadDeVecesAlquilado += 1;
    }
    /**
     * Devuelve la cantidad de veces que fue alquilado
     * @returns {number} Es la cantidad de veces alquilado
     */
    public getCantidadDeVecesAlquilado(): number {
        return this.cantidadDeVecesAlquilado;
    }
    /**
     * Aumenta la cantidad de ingresos de alquiler por un numero especificado
     * @param {number} value la cantidad de ingresos de alquiler que se le quiera agregar al vehiculo 
     */
    public aumentarIngresosAlquiler(value: number): void {
        this.ingresosAlquiler += value;
    }
    /**
     * Devuelve los ingresos de alquiler
     * @returns {number} Son los ingresos por alquiler
     */
    public getIngresosAlquiler(): number {
        return this.ingresosAlquiler;
    }
    /**
     * Aumenta la cantidad de costos de mantenimiento por un numero especificado
     * @param {number} value la cantidad de costos de mantenimiento que se le quiera agregar al vehiculo 
     */
    public aumentarCostosMantenimiento(value: number): void {
        this.costosMantenimiento += value;
    }
    /**
     * Devuelve los costos por mantenimiento
     * @returns {number} Son los costos por mantenimiento
     */
    public getCostosMantenimiento(): number {
        return this.costosMantenimiento;
    }
    /**
     * calcula la rentabilidad del vehiculo (ingresos alquiler - costos mantenimiento)
     * @returns {number} es la rentabilidad del vehiculo
     */
    public calcularRentabilidad(): number {
        return this.getIngresosAlquiler() - this.getCostosMantenimiento();
    }
}