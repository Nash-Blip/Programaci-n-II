import { EstadoVehiculo } from "./estadoVehiculo";
import Sedan from "./sedan";
import Vehiculo from "./vehiculo";

/**
 * Clase que se encarga de gestionar las estadisticas de un vehículo y de hacer el reporte con esas estadisticas.
*/
export default class Estadistica {
    private masAlquilado: Vehiculo = undefined as unknown as Vehiculo
    private menosAlquilado: Vehiculo = undefined as unknown as Vehiculo
    private masRentable: Vehiculo = undefined as unknown as Vehiculo
    private menosRentable: Vehiculo = undefined as unknown as Vehiculo 

    /**
     * Recorre el mapa de vehículos para encontrar el vehiculo menos alquilado.
     * Variable temporal guarda la cantidad de veces que se alquilo el vehículo actual
     * El primer vehiculo del Map siempre se asigna como el menos alquilado. Si se encuentra un vehículo menos alquilado que el primero, se lo asigna como el menos alquilado
     * @param {Map} vehiculos - El mapa con los vehículos 
     * @returns {Vehiculo} menosAlquilado - Devuelve el vehículo menos alquilado
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
     * Recorre el mapa de vehículos para encontrar el vehiculo menos alquilado.
     * Variable temporal guarda la cantidad de veces que se alquilo el vehículo actual (en el loop)
     * El primer vehiculo del Map siempre se asigna como el más alquilado. Si se encuentra un vehículo menos alquilado que el primero, se lo asigna como el más alquilado
     * @param {Map} vehiculos - El mapa con los vehículos 
     * @returns {Vehiculo} masAlquilado - Devuelve el vehículo más alquilado
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
     * Recorre el mapa de vehículos para encontrar el vehiculo menos rentable.
     * Variable temporal guarda la rentabilidad del vehículo actual.
     * El primer vehiculo del Map siempre se asigna como el menos rentable. Se asigna un nuevo vehículo si es menos rentable que el primero.
     * @param {Map} vehiculos - El mapa con los vehículos
     * @returns {Vehiculo} menosRentable - Devuelve el vehículo menos rentable.
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
     * Recorre el mapa de vehículos para encontrar el vehiculo más rentable.
     * Variable temporal guarda la rentabilidad del vehículo actual.
     * El primer vehiculo del Map siempre se asigna como el más rentable. Se asigna un nuevo vehículo si es más rentable que el primero.
     * @param {Map} vehiculos - El mapa con los vehículos 
     * @returns {Vehiculo} masRentable - Devuelve el vehículo menos alquilado
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
     * Calcula el porcentaje de vehiculos alquilados.
     * Se hace la conversión del Map de vehículos a un Array.
     * Se filtran los vehículos del array que estan en estado de alquiler.
     * Se hace el calculo y se lo convierte en un string.
     * @param {Map} vehiculos - El mapa con los vehículos
     * @returns {String} porcentaje - El porcentaje de vehículos en alquiler convertido en un string
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