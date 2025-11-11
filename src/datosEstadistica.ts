export default class DatosEstadistica {
    private cantidadDeVecesAlquilado: number;
    private ingresosAlquiler: number;
    public costosMantenimiento: number;

    constructor(){
        this.cantidadDeVecesAlquilado = 0;
        this.ingresosAlquiler = 0;
        this.costosMantenimiento = 0;
    }

    public aumentarCantidadDeVecesAlquilado(): void {
        this.cantidadDeVecesAlquilado += 1;
    }

    public getCantidadDeVecesAlquilado(): number {
        return this.cantidadDeVecesAlquilado;
    }

    public aumentarIngresosAlquiler(value: number): void {
        this.ingresosAlquiler += value;
    }

    public getIngresosAlquiler(): number {
        return this.ingresosAlquiler;
    }

    public aumentarCostosMantenimiento(value: number): void {
        this.costosMantenimiento += value;
    }

    public getCostosMantenimiento(): number {
        return this.costosMantenimiento;
    }

    public calcularRentabilidad(){
        return this.ingresosAlquiler - this.costosMantenimiento
    }
}