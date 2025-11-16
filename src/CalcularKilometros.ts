/**
 * Clase encargada de realizar los cálculos relacionados
 * con los kilómetros recorridos por un vehículo durante una reserva.
 */
export default class CalcularKilometros {

    /**
     * Calcula el promedio de kilómetros recorridos por día.
     *
     * @param {number} kmTotales - Cantidad total de kilómetros recorridos.
     * @param {number} dias - Cantidad de días de la reserva.
     * @returns {number} El promedio de kilómetros por día.
     * @throws {Error} Si los días son menores o iguales a 0.
     */
    public promedioKmDiarios(kmTotales: number, dias: number): number {
        if (dias <= 0) {
            throw new Error("Los dias deben ser mayor a 0");
        }
        return kmTotales / dias;
    }

    /**
     * Calcula la cantidad total de kilómetros recorridos
     * usando los valores inicial y final.
     *
     * @param {number} kmIniciales - Kilometraje inicial del vehículo.
     * @param {number} kmFinales - Kilometraje final del vehículo.
     * @returns {number} La diferencia entre kmFinales y kmIniciales.
     * @throws {Error} Si los kilómetros finales son menores o iguales a los iniciales.
     */
    public calcularKmTotales(kmIniciales: number, kmFinales: number): number {
        if (kmFinales <= kmIniciales) {
            throw new Error("Los km finales no pueden ser menores o iguales que los iniciales.");
        }
        return kmFinales - kmIniciales;
    }
}