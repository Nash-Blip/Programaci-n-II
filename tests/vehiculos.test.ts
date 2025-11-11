import Compacto from "../src/compacto";
import SUV from "../src/suv";
import Sedan from "../src/sedan";
import { EstadoVehiculo } from "../src/estadoVehiculo";

describe("Tests Vehiculos", () => {
    it("El constructor de la clase SUV debe instanciar un objeto de tipo SUV", () => {
        const suv = new SUV();
        expect(suv).toBeInstanceOf(SUV);
    })

    it("El constructor de la clase Compacto debe instanciar un objeto de tipo Compacto", () => {
        const compacto = new Compacto();
        expect(compacto).toBeInstanceOf(Compacto);
    })

    it("El constructor de la clase Sedan debe instanciar un objeto de tipo Sedan", () => {
        const sedan = new Sedan();
        expect(sedan).toBeInstanceOf(Sedan);
    })
    
    it("Debe cambiar correctamente el estado del Vehiculo", () => {
        const suv = new SUV();
        expect(suv["estado"]).toEqual(EstadoVehiculo.DISPONIBLE);

        suv.setEstadoEnAlquiler();
        expect(suv["estado"]).toEqual(EstadoVehiculo.EN_ALQUILER);

        suv.setEstadoEnMantenimiento();
        expect(suv["estado"]).toEqual(EstadoVehiculo.EN_MANTENIMIENTO);

        suv.setEstadoNecesitaLimpieza();
        expect(suv["estado"]).toEqual(EstadoVehiculo.NECESITA_LIMPIEZA);

        suv.setEstadoDisponible();
        expect(suv["estado"]).toEqual(EstadoVehiculo.DISPONIBLE);
    })

    it("Debe devolver el estado correcto del Vehiculo", () => {
        const compacto = new Compacto();
        expect(compacto.getEstado()).toEqual(compacto["estado"]);

        const sedan = new Sedan();
        expect(compacto.getEstado()).toEqual(compacto["estado"]);

        const suv = new SUV();
        expect(compacto.getEstado()).toEqual(compacto["estado"]);
    })

    it("Debe devolver el monto correcto de tarifa base", () => {
        const compacto = new Compacto();
        expect(compacto.getTarifaBase()).toEqual(30);

        const sedan = new Sedan();
        expect(sedan.getTarifaBase()).toEqual(50);

        const suv = new SUV();
        expect(suv.getTarifaBase()).toEqual(80);
    })
})