import Vehiculo from "./vehiculo";

/** Enum que representa los posibles estados del vehículo. */
export default abstract class EstadoVehiculo{
    protected vehiculo: Vehiculo;
    
    constructor(vehiculo: Vehiculo) {
        this.vehiculo = vehiculo;
    }

    public abstract alquilarVehiculo(): void;
    public abstract enviarAMantenimiento(): void;
    public abstract habilitarVehiculo(): void;
}