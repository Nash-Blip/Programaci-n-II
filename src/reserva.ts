import Cliente from "./cliente";
// import Vehiculo from
export default class Reserva{
    private inicio: string;
    private fin: string;
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    // no tendria q ir kmInicio y kmFin???
    /*
    private kmInicial: number
    private kmFinal: number */

    constructor(inicio: string, fin: string, cliente: Cliente, vehiculo: Vehiculo){
        this.inicio = inicio;
        this.fin = fin;
        this.cliente = cliente;
        this.vehiculo = vehiculo;
    }

    calcularCantidadDias(): number{
    }
    
    calcularKmTotales(): number{
      //  return this.kmFinal - kmInicial;
    }

    calcularKmDiarios(): number {
        return this.calcularKmTotales() / this.calcularCantidadDias();
    }



}