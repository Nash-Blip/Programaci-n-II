import Vehiculo from "./vehiculo";
import Reserva from "./Reserva";
import {EstadoVehiculo} from "./estadoVehiculo";
import moment from "moment";
import Disponibilidad from "./disponibilidad";
import {Tarifa} from "./Tarifa";

export default class GestionAlquiler{

    private vehiculos: Map<number, Vehiculo>;
    private reservas: Map<number, Reserva[]>;
    private verificadorDisponibilidad: Disponibilidad;

    constructor(){
        this.vehiculos = new Map();
        this.reservas = new Map();
        this.verificadorDisponibilidad = new Disponibilidad();
    }
    
    public procesarReserva(r: Reserva): boolean{
        const vehiculo = this.vehiculos.get(r.vehiculo.numMatricula);

        if(!vehiculo){
            throw new Error("Vehiculo no encontrado.");
        }
        if(vehiculo.getEstado() !== EstadoVehiculo.DISPONIBLE){
            throw new Error("El vehiculo no esta disponible.");
        }
        const reservasDelVehiculo = this.reservas.get(r.vehiculo.numMatricula) ?? [];
        if(!this.verificadorDisponibilidad.estaDisponible(r, reservasDelVehiculo)){
            return false;
        }
        return true;
    }

    public entregarVehiculo(r: Reserva): void{
        r.vehiculo.estado = EstadoVehiculo.EN_ALQUILER;

        const lista = this.reservas.get(r.vehiculo.numMatricula) ?? [];
        lista.push(r);

        this.reservas.set(r.vehiculo.numMatricula, lista);
        this.vehiculos.set(r.vehiculo.numMatricula, r.vehiculo);
    }

    public recibirVehiculo(r: Reserva): void{
        r.vehiculo.estado = EstadoVehiculo.DISPONIBLE;
        const precioFinal = r.calcularPrecioReserva();

        console.log(`Precio total a pagar ${precioFinal}`);

        this.vehiculos.set(r.vehiculo.numMatricula, r.vehiculo);
    }
}