import Vehiculo from "./vehiculo";
import CalcularKilometros from "./CalcularKilometros";
export default class Reserva{
    private idReserva: number;
    private fechaInicio: Date;
    private fechaFinalizacion: Date;
    private vehiculo: Vehiculo;
    private kmIniciales: number
    private kmFinales: number
    private calcularKilometros = CalcularKilometros;

    constructor(idReserva: number,
  fechaInicio: Date,
  fechaFinalizacion: Date,
  vehiculo: Vehiculo,
  kmIniciales: number,
  kmFinales: number){
        this.idReserva = idReserva;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.vehiculo = vehiculo;
        this.kmIniciales= kmIniciales;
        this.kmFinales = kmFinales; 
        this.calcularKilometros = new CalcularKilometros();
    }


    public getIdReserva():number {
        return this.idReserva;
    }
    public getFechaInicio():Date {
        return this.fechaInicio;
    }    
    public getFechaFinalizacion():Date {
        return this.fechaFinalizacion;
    }
    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }
    public getKmIniciales(): number {
        return this.kmIniciales;
    }
    public getKmFinales(): number {
        return this.kmFinales;
    }
    public setKmFinales(km: number):void{
        this.kmFinales = km;
    }
    
    public calcularCantidadDias(): number{
        const diferencia = this.fechaFinalizacion.getTime() - this.fechaInicio.getTime();
        return Math.ceil(diferencia /(1000 * 60 * 60 * 24)); 
    }

    public calcularPrecioReserva(): number {
        const kmTotales = this.calcularKilometros.calcularKmTotales(this.kmIniciales, this.kmFinales);
        const tarifa = this.vehiculo.getLogicaTarifa();
        return tarifa.calcularTarifa(this)
    }

}