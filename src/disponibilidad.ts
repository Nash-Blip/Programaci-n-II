import Reserva from "./Reserva";
import moment from "moment";
import Vehiculo from "./vehiculo";

export default class Disponibilidad {
  public estaDisponible(r: Reserva, reservasExistentes: Reserva[]): boolean {
    const inicio = moment(r.getFechaInicio());
    const fin = moment(r.getFechaFinalizacion());

    for (const existente of reservasExistentes) {
      const existenteInicio = moment(existente.getFechaInicio());
      const existenteFin = moment(existente.getFechaFinalizacion());

      if (
        inicio.isBetween(existenteInicio, existenteFin, undefined, "[)") ||
        fin.isBetween(existenteInicio, existenteFin, undefined, "(]") ||
        (inicio.isSameOrBefore(existenteInicio) && fin.isSameOrAfter(existenteFin))
      ) {
        return false;
      }
    }
    return true;
  }

  public estaEnMantenimiento(r: Reserva): boolean{
    if(
      r.getVehiculo().getkmUltimoMantenimiento() > 10000 ||
      r.getVehiculo().datosMantenimiento.calculadoraFecha() > 12 ||
      r.getVehiculo().datosMantenimiento.alquileresCantidad > 5
    ){
      return true;
    }
    return false;
  }
}