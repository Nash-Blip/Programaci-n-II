export default class CalcularKilometros{
    public promedioKmDiarios(kmTotales: number, dias: number): number{
        if(dias <= 0){
            throw new Error ("Los dias deben ser mayor a 0");
        }
        return kmTotales / dias;
    }
    public calcularKmTotales(kmIniciales: number, kmFinales: number): number{
        if(kmFinales <= kmIniciales){
            throw new Error ("Los km finales no pueden ser menores que los iniciales.");
        }
        return kmFinales - kmIniciales;
    }
}