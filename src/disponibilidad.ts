import Reserva from "./Reserva";
import moment from "moment";


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

  public necesitaMantenimiento(r: Reserva): boolean{
    const kmDesdeUltimoMant = r.getVehiculo().getKilometro() - r.getVehiculo().getDatosMantenimiento().getKmUltimoMant();
    const mesesTranscuMant = r.getVehiculo().getDatosMantenimiento().calculadoraFecha();
    const cantAlquileres = r.getVehiculo().getDatosMantenimiento().getAlquileresCantidad();
    
    return kmDesdeUltimoMant > 10000 || mesesTranscuMant > 12 || cantAlquileres % 5 === 0;
  }
}