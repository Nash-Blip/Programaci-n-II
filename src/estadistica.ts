import { EstadoVehiculo } from "./estadoVehiculo";
import Vehiculo from "./vehiculo";

export default class Estadistica {
    private vehiculos: Map<number, Vehiculo>
    constructor(){
        this.vehiculos = new Map();
    }

    public agregarVehiculos(matricula: number, vehiculo: Vehiculo): void {
        this.vehiculos.set(matricula, vehiculo);
    }

    public vehiculoMasAlquilado(): Vehiculo | undefined {
        let vehiculoMasAlquilado: Vehiculo | undefined = undefined
        let mayorCantidadDeVecesAlquilado = -999999999
        this.vehiculos.forEach((vehiculo, numMatricula) =>{
            let cantidadDeVecesAlquilado = vehiculo.datosEstadistica.getCantidadDeVecesAlquilado();
            if(cantidadDeVecesAlquilado > mayorCantidadDeVecesAlquilado){
                mayorCantidadDeVecesAlquilado = cantidadDeVecesAlquilado;
                vehiculoMasAlquilado = vehiculo;
            }
        })

        return vehiculoMasAlquilado;
    }

    public menosRentabilidad(): Vehiculo | undefined {
        let vehiculoMenosRentable: Vehiculo | undefined = undefined;
        let rentabilidadMinima = 999999999;
        this.vehiculos.forEach((vehiculo, numMatricula) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(rentabilidad < rentabilidadMinima){
                rentabilidadMinima = rentabilidad;
                vehiculoMenosRentable = vehiculo;
            }
        })

        return vehiculoMenosRentable;
    }

    public mayorRentabilidad(): Vehiculo | undefined {
        let vehiculoMasRentable: Vehiculo | undefined = undefined;
        let rentabilidadMaxima = -999999999;
        this.vehiculos.forEach((vehiculo, numMatricula) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(rentabilidad > rentabilidadMaxima){
                rentabilidadMaxima = rentabilidad;
                vehiculoMasRentable = vehiculo;
            }
        })

        return vehiculoMasRentable;
    }

    public porcentajeEnAlquiler(vehiculos: Map<number, Vehiculo>){
        const vehiculosArray = Array.from(vehiculos.values());
        const totalVehiculos = vehiculosArray.length;
        const totalEnAlquiler = vehiculosArray.filter(v => v["estado"] === EstadoVehiculo.EN_ALQUILER).length;

        if(vehiculosArray.length == 0){
            throw new Error ("No hay vehiculos en la flota")
        }
        
        const porcentajeEnAlquiler = (totalEnAlquiler / totalVehiculos) * 100

        return porcentajeEnAlquiler
    }
}