import moment from "moment";

export default class DatosMantenimiento{

    constructor(
        private kmUltimoMantenimiento: number,
        private fechaUltimoMantenimiento: Date, 
        private alquileresCantidad: number
    ){}

    public setKmUltimoMant(value: number): void{
        this.kmUltimoMantenimiento = value;
    }
    public getKmUltimoMant(): number{
        return this.kmUltimoMantenimiento;
    }
    public setFechaUltimoMant(value: Date): void{
        this.fechaUltimoMantenimiento = value;
    }
    public getFechaUltimoMant(): Date{
        return this.fechaUltimoMantenimiento;
    }
    public setAlquileresCantidad(value: number): void{
        this.alquileresCantidad = value;
    }
    public getAlquileresCantidad(): number{
        return this.alquileresCantidad;
    }
    
    public calculadoraFecha(): number{
        return moment().diff(this.fechaUltimoMantenimiento, "months");
    }
}