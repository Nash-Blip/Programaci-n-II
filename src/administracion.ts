import Vehiculo from "./vehiculo";
import Reserva from "./Reserva";
import {EstadoVehiculo} from "./estadoVehiculo";
import Disponibilidad from "./disponibilidad";
import Estadistica from "./estadistica";
import Mantenimiento from "./mantenimiento";

/**
* Clase principal del sistema que gestiona vehículos, reservas,
* disponibilidad, mantenimiento y estadísticas.
* @class
*/
export default class Administracion{

    private vehiculos: Map<number, Vehiculo>;
    private reservas: Map<number, Reserva[]>;
    private mantenimientos: Map<number, Mantenimiento>;
    private verificadorDisponibilidad: Disponibilidad;
    private controladorDeEstadistica: Estadistica;

    /**
    * Crea una instancia de la clase Administracion,
    * inicializando los mapas de vehículos, reservas y mantenimientos,
    * además de los controladores de disponibilidad y estadísticas.
    */
    constructor(){
        this.vehiculos = new Map();
        this.reservas = new Map();
        this.mantenimientos = new Map();
        this.verificadorDisponibilidad = new Disponibilidad();
        this.controladorDeEstadistica = new Estadistica();
    }

    /** Retorna la flota de vehículos. */
    public getVehiculos(): Map<number, Vehiculo> {
        return this.vehiculos;
    }

    /** Retorna las reservas de un vehículo. */
    public getReservas(): Map<number, Reserva[]> {
        return this.reservas;
    }
    
    /**
    * Procesa una reserva verificando disponibilidad y estado del vehículo.
    * @param {Reserva} r - Reserva a procesar.
    * @returns {boolean} True si la reserva puede realizarse, false si existe solapamiento.
    * @throws {Error} Si el vehículo no existe o no está disponible.
    */
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

    /**
     * Busca el vehiculo en la flota de vehiculos
     * @param {Reserva} r - Reserva que contiene el vehiculo solicitado
     * @returns {Vehiculo} solicitado por la reserva
     * @throws {Error} Si  el vehiculo no se encuentra registrado en la flota
     */
    private obtenerVehiculoDeReserva(r: Reserva): Vehiculo{
        const id = r.getVehiculo().getNumMatricula();
        const vehiculo = this.vehiculos.get(id);

        if(!vehiculo){
            throw new Error("Vehiculo no encontrado");
        }
        return vehiculo;
    }
    
    /**
    * Verifica si el vehiculo se encuentra en mantenimiento.
    * Si no lo esta, retorna sin más. 
    * En caso de estarlo verifica si pasaron las 24hs desde que entro al mismo.
    * @param {Vehiculo} vehiculo - Vehículo que se necesita saber si esta en mantenimiento o no.
    * @param {Date} fechaActual - Fecha actual para el cálculo.
    */
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

    /**
    * Entrega un vehículo y lo registra como alquilado.
    * @param {Reserva} r - Reserva correspondiente al alquiler.
    */
    public entregarVehiculo(r: Reserva): void{
        r.getVehiculo().setEstadoEnAlquiler();
        r.getVehiculo().getDatosEstadistica().aumentarCantidadDeVecesAlquilado();

        const lista = this.reservas.get(r.getVehiculo().getNumMatricula()) ?? [];
        lista.push(r);

        this.reservas.set(r.getVehiculo().getNumMatricula(), lista);
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
    }

    /**
    * Recibe un vehículo devuelto. Actualiza estadísticas,
    * determina si requiere mantenimiento y actualiza su estado.
    * @param {Reserva} r - Reserva del vehículo devuelto.
    */
    public recibirVehiculo(r: Reserva): void{
        const vehiculo = r.getVehiculo();
        const datosMant = vehiculo.getDatosMantenimiento();

        datosMant.aumentarCantidadAlquileres();

        const necesitaMant = this.verificadorDisponibilidad.necesitaMantenimiento(r);
        if(necesitaMant){
            const mantenimiento = new Mantenimiento(vehiculo);
            this.mantenimientos.set(vehiculo.getNumMatricula(), mantenimiento);
            r.marcarMantenimiento();
        } else{
            vehiculo.setEstadoDisponible();
        }
        this.vehiculos.set(r.getVehiculo().getNumMatricula(), r.getVehiculo());
    }

    /**
    * Genera un reporte estadístico completo de toda la flota.
    * @returns {string} Reporte en formato string.
    */
    public recibirReporte(): string{
        return this.controladorDeEstadistica.generarReporte(this.vehiculos);
    }
}