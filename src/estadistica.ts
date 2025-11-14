import { EstadoVehiculo } from "./estadoVehiculo";
import Sedan from "./sedan";
import Vehiculo from "./vehiculo";

export default class Estadistica {
    private masAlquilado: Vehiculo;
    private menosAlquilado: Vehiculo; 
    private masRentable: Vehiculo;
    private menosRentable: Vehiculo; 

    constructor(){
        this.masAlquilado = new Sedan()
        this.menosAlquilado = new Sedan()
        this.masRentable = new Sedan()
        this.menosRentable = new Sedan()

    }
    public vehiculoMenosAlquilado(vehiculos: Map<number, Vehiculo>): Vehiculo{
        if(vehiculos.size ===0){
            throw new Error ("No hay vehiculos en la flota")
        }

        vehiculos.forEach((vehiculo, number)=>{
            let cantidadDeVecesAlquilado = vehiculo.datosEstadistica.getCantidadDeVecesAlquilado();
            if(cantidadDeVecesAlquilado < this.menosAlquilado.datosEstadistica.getCantidadDeVecesAlquilado()){
                this.menosAlquilado = vehiculo;
            }
        })
        return this.menosAlquilado
    }

    public vehiculoMasAlquilado(vehiculos: Map<number, Vehiculo>): Vehiculo{
        vehiculos.forEach((vehiculo, numMatricula) =>{
            let cantidadDeVecesAlquilado = vehiculo.datosEstadistica.getCantidadDeVecesAlquilado();
            if(cantidadDeVecesAlquilado > this.masAlquilado.datosEstadistica.getCantidadDeVecesAlquilado()){
                this.masAlquilado = vehiculo
            }
        })
        return this.masAlquilado;
    }

    public menosRentabilidad(vehiculos: Map<number, Vehiculo>): Vehiculo{
        vehiculos.forEach((vehiculo, number) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(rentabilidad < this.menosRentable.datosEstadistica.calcularRentabilidad()){
                this.menosRentable = vehiculo
            }
        })

        return this.menosRentable;
    }

    public mayorRentabilidad(vehiculos: Map<number, Vehiculo>): Vehiculo{
        vehiculos.forEach((vehiculo, number) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(rentabilidad > this.menosRentable.datosEstadistica.calcularRentabilidad()){
                this.menosRentable = vehiculo
            }
        })

        return this.masRentable;
    }

    public porcentajeEnAlquiler(vehiculos: Map<number, Vehiculo>): string{
        const vehiculosArray = Array.from(vehiculos.values());
        const totalVehiculos = vehiculosArray.length;
        const totalEnAlquiler = vehiculosArray.filter(v => v["estado"] === EstadoVehiculo.EN_ALQUILER).length;

        if(vehiculosArray.length == 0){
            throw new Error ("No hay vehiculos en la flota")
        }
        
        const porcentajeEnAlquiler = (totalEnAlquiler / totalVehiculos) * 100
        const porcentaje = porcentajeEnAlquiler.toString() + "%"

        return porcentaje
    }

    public generarReporte(vehiculos: Map<number, Vehiculo>): string{

        const masAlquilado = this.vehiculoMasAlquilado(vehiculos);
        const masRentable = this.mayorRentabilidad(vehiculos);
        const menosRentable = this.menosRentabilidad(vehiculos);
        const porcentaje = this.porcentajeEnAlquiler(vehiculos);
        return `
        ===== REPORTE DE ESTADISTICAS =====
        Vehiculo mas alquilado: ${masAlquilado}
        Vehiculo mas rentable: ${masRentable}
        Vehiculo menos rentable: ${menosRentable}
        Porcentaje en alquiler: ${porcentaje}
        `
    }
}