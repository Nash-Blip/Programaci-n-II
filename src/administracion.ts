import Vehiculo from "./vehiculo";
import Reserva from "./Reserva";
import {EstadoVehiculo} from "./estadoVehiculo";
import Disponibilidad from "./disponibilidad";

export default class GestionAlquiler{

    private vehiculos: Map<number, Vehiculo>;
    private reservas: Map<number, Reserva[]>;
    private verificadorDisponibilidad: Disponibilidad;

    constructor(){
        this.vehiculos = new Map();
        this.reservas = new Map();
        this.verificadorDisponibilidad = new Disponibilidad();
    }

    public getVehiculos(): Map<number, Vehiculo> {
        return this.vehiculos;
    }

    public getReservas(): Map<number, Reserva[]> {
        return this.reservas;
    }
    
    public procesarReserva(r: Reserva): boolean{
        const vehiculo = this.vehiculos.get(r.getVehiculo().getNumMatricula());

        if(!vehiculo){
            throw new Error("Vehiculo no encontrado.");
        }
        if(vehiculo.getEstado() !== EstadoVehiculo.DISPONIBLE){
            throw new Error("El vehiculo no esta disponible.");
        }
        if(this.verificadorDisponibilidad.estaEnMantenimiento(r)){
            throw new Error("El vehiculo se encuentra en Mantenimiento.");
        }
        const reservasDelVehiculo = this.reservas.get(r.getVehiculo().getNumMatricula()) ?? [];
        
        return this.verificadorDisponibilidad.estaDisponible(r, reservasDelVehiculo);
    }

    public entregarVehiculo(r: Reserva): void{
        r.getVehiculo().setEstadoEnAlquiler();

        const lista = this.reservas.get(r.getVehiculo().getNumMatricula()) ?? [];
        lista.push(r);

        this.reservas.set(r.getVehiculo().getNumMatricula(), lista);
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
    }

    public recibirVehiculo(r: Reserva): number{
        r.getVehiculo().setEstadoDisponible();
        const precioFinal = r.calcularPrecioReserva();
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
        return precioFinal;
    }
}