import Reserva from "./Reserva";
import moment from "moment";

export default class Disponibilidad{    
    
    public estaDisponible(r: Reserva, reservasExistentes: Reserva[]): boolean{
        for(const existente of reservasExistentes){
            const inicio = moment(r.inicio, "YYYY-MM-DD");
            const fin = moment(r.fin, "YYYY-MM-DD");
            const existenteInicio = moment(existente.inicio, "YYYY-MM-DD");
            const existenteFin = moment(existente.fin, "YYYY-MM-DD");

            if(inicio.isBetween(existenteInicio, existenteFin, undefined, "[)") || 
            fin.isBetween(existenteInicio, existenteFin, undefined, "(]") ||
            inicio.isSameOrBefore(existenteInicio) && fin.isSameOrAfter(existenteFin)){
                return false;
            }
        }
        return true;
    }
}