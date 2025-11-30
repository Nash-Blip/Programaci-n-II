import EstadoDisponible from "./EstadoDisponible";
import EstadoMantenimiento from "./EstadoMantenimiento";
import { IEstado } from "./IEstados";
import Vehiculo from "./vehiculo";

export default class EstadoEnAlquiler implements IEstado{
    private contexto: Vehiculo;
    private kmIniciales: number;
    constructor(c: Vehiculo){
        this.contexto = c;
        this.kmIniciales = this.contexto.getKilometro();
    }

    setContexto(c: Vehiculo): void{
        this.contexto = c;
    }

    alquilar(): boolean {
        throw new Error('El vehiculo ya se encuentra alquilado, no es posible su reserva');
    }

    devolver(): void {
        this.actualizarDatosMantenimiento();
        if(this.necesitaMantenimiento()){
            this.contexto.setEstado(new EstadoMantenimiento(this.contexto));
        }else{
            this.contexto.setEstado(new EstadoDisponible(this.contexto));
        }
    }

    private necesitaMantenimiento(): boolean{
        const kmDesdeUltimoMant = this.contexto.getDatosMantenimiento().getKmUltimoMant();
        const mesesTranscuMant = this.contexto.getDatosMantenimiento().getFechaUltimoMant();
        const cantAlquileres =this.contexto.getDatosMantenimiento().getAlquileresCantidad();
    
        return kmDesdeUltimoMant > 10000 || mesesTranscuMant > 12 || cantAlquileres > 5
    }

    private diferenciaKilometros(): number{
        return this.contexto.getKilometro() - this.kmIniciales
    }

    private actualizarDatosMantenimiento(): void{
        this.contexto.getDatosMantenimiento().aumentarCantidadAlquileres();
        this.contexto.getDatosMantenimiento().aumentarKmUltimoMant(this.diferenciaKilometros());
    }

}