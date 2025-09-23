import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import EstadoVehiculo from "./estadoVehiculo";
import moment from "moment";

export default class GestionAlquiler{
    private vehiculo: Array<Vehiculo>;
    private reservas: Array<Reserva>;

    constructor(){
        this.vehiculo = [];
        this.reservas = [];
    }

    public crearReserva(r: Reserva): void{
        if(this.verificarDisponibilidad(r)){
            this.reservas.push(r);
        }
    }

    public verificarDisponibilidad(r: Reserva): boolean{
        if(r.vehiculo.estado !== EstadoVehiculo.DISPONIBLE){
            return false;
        }else{
            return this.noHaySolapamiento(r);
        }
    }

    public noHaySolapamiento(r: Reserva): boolean{
        for(const existente of this.reservas){
            if(existente.vehiculo === r.vehiculo){

                const inicio = moment(r.inicio, "YYYY-MM-DD");
                const fin = moment(r.fin, "YYYY-MM-DD");
                const existenteInicio = moment(existente.inicio, "YYYY-MM-DD");
                const existenteFin = moment(existente.fin, "YYYY-MM-DD");

                if(inicio.isBetween(existenteInicio, existenteFin, undefined, "[)") || 
                fin.isBetween(existenteInicio, existenteFin, undefined, "(]") ||
                inicio.isSameOrBefore(existenteInicio) && fin.isSameOrAfter(existenteFin)){
                    return false;
                }
                
            }   
        }
        return true;
    }

    public calcularKilometraje(r: Reserva): number{

    }

    public solicitarTarifar(r: Reserva): number{
        return r.cal
    }

}