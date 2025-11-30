import moment from "moment";

/**
* Clase que almacena los datos de mantenimiento del vehículo.
* @class
*/

export default class DatosMantenimiento{

    /**
     * @param {number} kmUltimoMantenimiento - Kilómetros al momento del último mantenimiento.
     * @param {Date} fechaUltimoMantenimiento - Fecha del último mantenimiento.
     * @param {number} alquileresCantidad - Cantidad de alquileres desde la última revisión.
     */
    constructor(private kmUltimoMantenimiento: number,
    private fechaUltimoMantenimiento: Date,
    private alquileresCantidad: number){
    }

    /** Actualiza los kilómetros del último mantenimiento. */
    public aumentarKmUltimoMant(value: number): void{
        this.kmUltimoMantenimiento += value;
    }
    /** Retorna los kilómetros del último mantenimiento. */
    public getKmUltimoMant(): number{
        return this.kmUltimoMantenimiento;
    }
    /** Actualiza la fecha del último mantenimiento. */
    public setFechaUltimoMant(value: Date): void{
        this.fechaUltimoMantenimiento = value;
    }
    /** Retorna la fecha del último mantenimiento. */
    public getFechaUltimoMant(): number{
        return this.calculadoraFecha()
    }
    /** Aumenta la cantidad de alquileres en 1. */
    public aumentarCantidadAlquileres(): void{
        this.alquileresCantidad += 1;
    }
    /** Retorna la cantidad de alquileres acumuladas. */
    public getAlquileresCantidad(): number{
        return this.alquileresCantidad;
    }
     /**
    * Calcula la cantidad de meses desde el último mantenimiento.
    * @returns {number} Meses transcurridos.
    */
    public calculadoraFecha(): number{
        return moment().diff(this.fechaUltimoMantenimiento, "months");
    }
    
    public reiniciarDatos(): void{
        this.kmUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresCantidad = 0;
    }
}