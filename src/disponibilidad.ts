import Reserva from "./Reserva";
import moment from "moment";

/**
* Clase encargada de verificar la disponibilidad del vehículo.
* Rechaza reservas en caso de solapamiento.
* Envía el vehículo a mantenimiento, en caso de necesitarlo.
*/
export default class Disponibilidad {
  
  /**
  * Verifica si la fecha para la reserva está libre o si existe solapamiento con otra reserva.
  * @param r - Reserva que contiene la fecha a verificar.
  * @param reservasExistentes - Fechas de reservas existentes para un mismo vehículo.
  * @returns True si no existe solapamiento con el resto de reservas, false si se solapa con otra reserva.
  */
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

  /**
  * Verifica si el vehículo necesita mantenimiento.
  * @param r - Reserva que contiene el vehículo a verificar.
  * @returns True si necesita mantenimiento, false si no lo necesita.
  */
  public necesitaMantenimiento(r: Reserva): boolean{
    const kmDesdeUltimoMant = r.getVehiculo().getKilometro() - r.getVehiculo().getDatosMantenimiento().getKmUltimoMant();
    const mesesTranscuMant = r.getVehiculo().getDatosMantenimiento().calculadoraFecha();
    const cantAlquileres = r.getVehiculo().getDatosMantenimiento().getAlquileresCantidad();
    
    return kmDesdeUltimoMant > 10000 || mesesTranscuMant > 12 || cantAlquileres % 5 === 0;
  }
}