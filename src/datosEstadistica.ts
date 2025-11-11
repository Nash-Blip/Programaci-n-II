export default class DatosEstadistica {
    private cantidadDeVecesAlquilado: number;
    private ingresosAlquiler: number;
    public costosMantenimiento: number;

    constructor(){
        this.cantidadDeVecesAlquilado = 0;
        this.ingresosAlquiler = 0;
        this.costosMantenimiento = 0;
    }

    public setCantidadDeVecesAlquilado(value: number): void {
        this.cantidadDeVecesAlquilado = value;
    }

    public getCantidadDeVecesAlquilado(): number {
        return this.cantidadDeVecesAlquilado;
    }

    public setIngresosAlquiler(value: number): void {
        this.ingresosAlquiler = value;
    }

    public getIngresosAlquiler(): number {
        return this.ingresosAlquiler;
    }

    public setCostosMantenimiento(value: number): void {
        this.costosMantenimiento = value;
    }

    public getCostosMantenimiento(): number {
        return this.costosMantenimiento;
    }

    public calcularRentabilidad(): number {
        return this.getIngresosAlquiler() - this.getCostosMantenimiento();
    }
}