import EstadoVehiculo from "../estadoVehiculo";
import Vehiculo from "../vehiculo";
import StateDisponible from "./disponible";
import StateMantenimiento from "./enMantenimiento";

export default class StateEnAlquiler extends EstadoVehiculo {        
    constructor(vehiculo: Vehiculo) {
        super(vehiculo);
    }

    public enviarAMantenimiento(): void {
        this.vehiculo.setEstado(new StateMantenimiento(this.vehiculo));
    }

    public alquilarVehiculo(): void {
        throw new Error("El vehiculo ya está siendo alquilado.");
    }

    public habilitarVehiculo(): void {
        this.vehiculo.setEstado(new StateDisponible(this.vehiculo));
    }
}