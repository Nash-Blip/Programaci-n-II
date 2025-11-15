import { EstadoVehiculo } from "./estadoVehiculo";
import Sedan from "./sedan";
import Vehiculo from "./vehiculo";
/**
 * Calcula las estadisticas de cada vehiculo y genera un reporte
 * @class
 */
export default class Estadistica {
    private masAlquilado: Vehiculo = undefined as unknown as Vehiculo
    private menosAlquilado: Vehiculo = undefined as unknown as Vehiculo
    private masRentable: Vehiculo = undefined as unknown as Vehiculo
    private menosRentable: Vehiculo = undefined as unknown as Vehiculo 
    /**
     * Recorre la flota de vehiculos y devuelve el menos alquilado
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {Vehiculo} - Es el vehiculo menos alquilado de la flota
     */
    public vehiculoMenosAlquilado(vehiculos: Map<number, Vehiculo>): Vehiculo{

        vehiculos.forEach((vehiculo, number)=>{
            let cantidadDeVecesAlquilado = vehiculo.datosEstadistica.getCantidadDeVecesAlquilado();
            if(this.menosAlquilado === undefined || cantidadDeVecesAlquilado < this.menosAlquilado.datosEstadistica.getCantidadDeVecesAlquilado()){
                this.menosAlquilado = vehiculo;
            }
        })
        return this.menosAlquilado;
    }
    /**
     * Recorre la flota de vehiculos y devuelve el mas alquilado
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {Vehiculo} - Es el vehiculo mas alquilado de la flota
     */
    public vehiculoMasAlquilado(vehiculos: Map<number, Vehiculo>): Vehiculo{

        vehiculos.forEach((vehiculo, number) =>{
            let cantidadDeVecesAlquilado = vehiculo.datosEstadistica.getCantidadDeVecesAlquilado();
            if(this.masAlquilado === undefined || cantidadDeVecesAlquilado > this.masAlquilado.datosEstadistica.getCantidadDeVecesAlquilado()){
                this.masAlquilado = vehiculo
            }
        })
        return this.masAlquilado;
    }
    /**
     * Recorre la flota de vehiculos y devuelve el menos rentable
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {Vehiculo} - Es el vehiculo menos rentable de la flota
     */
    public menosRentabilidad(vehiculos: Map<number, Vehiculo>): Vehiculo{
        vehiculos.forEach((vehiculo, number) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(this.menosRentable === undefined || rentabilidad < this.menosRentable.datosEstadistica.calcularRentabilidad()){
                this.menosRentable = vehiculo
            }
        })

        return this.menosRentable;
    }
    /**
     * Recorre la flota de vehiculos y devuelve el mas rentable
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {Vehiculo} - Es el vehiculo mas rentable de la flota
     */
    public mayorRentabilidad(vehiculos: Map<number, Vehiculo>): Vehiculo{
        vehiculos.forEach((vehiculo, number) =>{
            let rentabilidad = vehiculo.datosEstadistica.calcularRentabilidad();
            if(this.masRentable === undefined || rentabilidad > this.masRentable.datosEstadistica.calcularRentabilidad()){
                this.masRentable = vehiculo
            }
        })

        return this.masRentable;
    }
    /**
     * Calcula el porcentaje de vehiculos de la flota que se encuentran en alquiler
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {string} string que representa el porcentaje de vehiculos en alquiler
     */
    public porcentajeEnAlquiler(vehiculos: Map<number, Vehiculo>): string{
        const vehiculosArray = Array.from(vehiculos.values());
        const totalVehiculos = vehiculosArray.length;
        const totalEnAlquiler = vehiculosArray.filter(v => v["estado"] === EstadoVehiculo.EN_ALQUILER).length;
        
        const porcentajeEnAlquiler = (totalEnAlquiler / totalVehiculos) * 100
        const porcentaje = porcentajeEnAlquiler.toString() + "%"

        return porcentaje
    }
    /**
     * Genera un reporte de estadisticas qeu devuelve los siguientes datos:
     * Vehiculo mas y menos alquilado
     * Vehiculo mas y menos rentable
     * Porcentaje de vehiculos que se encuentran en alquiler
     * @param {Map}vehiculos Es la flota de vehiculos que se pasa desde administracion
     * @returns {string} Retorne el reporte
     */
    public generarReporte(vehiculos: Map<number, Vehiculo>): string{

        const masAlquilado = this.vehiculoMasAlquilado(vehiculos);
        const menosAlquilado = this.vehiculoMenosAlquilado(vehiculos);
        const masRentable = this.mayorRentabilidad(vehiculos);
        const menosRentable = this.menosRentabilidad(vehiculos);
        const porcentaje = this.porcentajeEnAlquiler(vehiculos);
        return `
        ===== REPORTE DE ESTADISTICAS =====
        Vehiculo mas alquilado: ${masAlquilado.getNumMatricula()}
        Vehiculo menos alquilado: ${menosAlquilado.getNumMatricula()}
        Vehiculo mas rentable: ${masRentable.getNumMatricula()}
        Vehiculo menos rentable: ${menosRentable.getNumMatricula()}
        Porcentaje en alquiler: ${porcentaje}
        `
    }
}