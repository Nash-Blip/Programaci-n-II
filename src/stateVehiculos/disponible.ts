import EstadoVehiculo from "../estadoVehiculo";
import StateEnAlquiler from "./enAlquiler";
import StateMantenimiento from "./enMantenimiento";

export default class StateDisponible extends EstadoVehiculo {
    

    public enviarAMantenimiento(): void {
        this.vehiculo.setEstado(new StateMantenimiento(this.vehiculo));
    }

    public alquilarVehiculo(): void {
        this.vehiculo.setEstado(new StateEnAlquiler(this.vehiculo));   
    }

    public habilitarVehiculo(): void {
        throw new Error("El vehiculo ya esta disponible para ser alquilado.");
    }
}