import EstadoVehiculo from "../estadoVehiculo";
import StateDisponible from "./disponible";

export default class StateMantenimiento extends EstadoVehiculo {
    public enviarAMantenimiento(): void {
        throw new Error("El vehiculo ya esta en mantenimiento.");
    }

    public alquilarVehiculo(): void {
        throw new Error("No se puede alquilar un vehiculo en mantenimiento.");
    }

    public habilitarVehiculo(): void {
        this.vehiculo.setEstado(new StateDisponible(this.vehiculo));
    }
}