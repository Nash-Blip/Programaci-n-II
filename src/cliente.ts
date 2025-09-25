import GestionAlquiler from "./gestionAlquiler";
import Reserva from "./reserva";
//import Vehivulo from
export default class Cliente{
    private id:number;
    private nombre: string;

    constructor(id:number, nombre: string){
        this.id = id;
        this.nombre = nombre;
    }
    
    public pedirReserva(inicio: string, fin: string, gestion: GestionAlquiler, vehiculo: Vehiculo): Reserva{
    const reserva = new Reserva(inicio, fin, this, vehiculo);
        gestion.crearReserva(reserva);
        return reserva;
    }

    public setId(id: number): void{
        this.id = id;
    }

    public getId(): number {
      return this.id;
    }
    
    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    public getNombre(): string{
        return this.nombre;
    }

}