import moment from "moment";

/**
* Clase que almacena los datos de mantenimiento del vehículo.
*/

export default class DatosMantenimiento{

    /**
     * @param kmUltimoMantenimiento - Kilómetros al momento del último mantenimiento.
     * @param fechaUltimoMantenimiento - Fecha del último mantenimiento.
     * @param alquileresCantidad - Cantidad de alquileres desde la última revisión.
     */
    constructor(
        private kmUltimoMantenimiento: number,
        private fechaUltimoMantenimiento: Date, 
        private alquileresCantidad: number
    ){}

    /** Actualiza los kilómetros del último mantenimiento. */
    public setKmUltimoMant(value: number): void{
        this.kmUltimoMantenimiento = value;
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
    public getFechaUltimoMant(): Date{
        return this.fechaUltimoMantenimiento;
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
    * @returns Meses transcurridos.
    */
    public calculadoraFecha(): number{
        return moment().diff(this.fechaUltimoMantenimiento, "months");
    }
}