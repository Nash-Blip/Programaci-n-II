import Vehiculo from "./vehiculo";
import Reserva from "./Reserva";
import {EstadoVehiculo} from "./estadoVehiculo";
import Disponibilidad from "./disponibilidad";
import Estadistica from "./estadistica";
import Mantenimiento from "./mantenimiento";

export default class Administracion{

    private vehiculos: Map<number, Vehiculo>;
    private reservas: Map<number, Reserva[]>;
    private mantenimientos: Map<number, Mantenimiento>;
    private verificadorDisponibilidad: Disponibilidad;
    private controladorDeEstadistica: Estadistica;

    constructor(){
        this.vehiculos = new Map();
        this.reservas = new Map();
        this.mantenimientos = new Map();
        this.verificadorDisponibilidad = new Disponibilidad();
        this.controladorDeEstadistica = new Estadistica();
    }

    public getVehiculos(): Map<number, Vehiculo> {
        return this.vehiculos;
    }

    public getReservas(): Map<number, Reserva[]> {
        return this.reservas;
    }
    
    public procesarReserva(r: Reserva): boolean{
        const vehiculo = this.obtenerVehiculoDeReserva(r);

        this.actualizarMantenimiento(vehiculo);
        
        if(vehiculo.getEstado() === EstadoVehiculo.EN_MANTENIMIENTO){
            throw new Error("El vehiculo esta en mantenimiento.");
        }
        if(vehiculo.getEstado() !== EstadoVehiculo.DISPONIBLE){
            throw new Error("El vehiculo no esta disponible.");
        }
        const id = vehiculo.getNumMatricula();
        const reservasDelVehiculo = this.reservas.get(id) ?? [];
        
        return this.verificadorDisponibilidad.estaDisponible(r, reservasDelVehiculo);
    }

    private obtenerVehiculoDeReserva(r: Reserva): Vehiculo{
        const id = r.getVehiculo().getNumMatricula();
        const vehiculo = this.vehiculos.get(id);

        if(!vehiculo){
            throw new Error("Vehiculo no encontrado");
        }
        return vehiculo;
    }
    
    private actualizarMantenimiento(vehiculo: Vehiculo, fechaActual: Date = new Date()): void{
        const mantenimiento = this.mantenimientos.get(vehiculo.getNumMatricula());

        if(!mantenimiento){
            return;
        }
        const mantenimientoFinalizado = mantenimiento.informeHorasTranscurridas(fechaActual);
        if(mantenimientoFinalizado){
            mantenimiento.finalizar(fechaActual);
            this.mantenimientos.delete(vehiculo.getNumMatricula());
        }
    }
    public entregarVehiculo(r: Reserva): void{
        r.getVehiculo().setEstadoEnAlquiler();
        r.getVehiculo().getDatosEstadistica().aumentarCantidadDeVecesAlquilado();

        const lista = this.reservas.get(r.getVehiculo().getNumMatricula()) ?? [];
        lista.push(r);

        this.reservas.set(r.getVehiculo().getNumMatricula(), lista);
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
    }

    public recibirVehiculo(r: Reserva): void{
        const vehiculo = r.getVehiculo();
        const datosMant = vehiculo.getDatosMantenimiento();

        datosMant.aumentarCantidadAlquileres();

        const necesitaMant = this.verificadorDisponibilidad.necesitaMantenimiento(r);
        if(necesitaMant){
            const mantenimiento = new Mantenimiento(vehiculo);
            this.mantenimientos.set(vehiculo.getNumMatricula(), mantenimiento);
        } else{
            vehiculo.setEstadoDisponible();
        }
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
    }

    public recibirReporte(): string{
        return this.controladorDeEstadistica.generarReporte(this.vehiculos);
    }
}