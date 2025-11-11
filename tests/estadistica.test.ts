import Estadistica from "../src/estadistica";
import { mock } from "jest-mock-extended";
import Vehiculo from "../src/vehiculo";
import DatosEstadistica from "../src/DatosEstadistica";

describe("Tests Estadística", () =>{
    let estadistica: Estadistica;

    let vehiculoUno = mock<Vehiculo>();
    let vehiculoDos = mock<Vehiculo>();
    let vehiculoTres = mock<Vehiculo>();

    let vehiculoUnoDatos = mock<DatosEstadistica>();
    let vehiculoDosDatos = mock<DatosEstadistica>();
    let vehiculoTresDatos = mock<DatosEstadistica>();

    beforeEach(()=>{
        estadistica = new Estadistica();

        vehiculoUno.datosEstadistica = vehiculoUnoDatos;
        vehiculoDos.datosEstadistica = vehiculoDosDatos;
        vehiculoTres.datosEstadistica = vehiculoTresDatos;

        vehiculoUnoDatos.getCantidadDeVecesAlquilado.mockReturnValue(10);
        vehiculoDosDatos.getCantidadDeVecesAlquilado.mockReturnValue(8);
        vehiculoTresDatos.getCantidadDeVecesAlquilado.mockReturnValue(15);

        vehiculoUnoDatos.calcularRentabilidad.mockReturnValue(50)
        vehiculoDosDatos.calcularRentabilidad.mockReturnValue(500);
        vehiculoTresDatos.calcularRentabilidad.mockReturnValue(150);

        estadistica.agregarVehiculos(1, vehiculoUno);
        estadistica.agregarVehiculos(2, vehiculoDos);
        estadistica.agregarVehiculos(3, vehiculoTres);
    })

    test("El metodo vehiculoMasAlquilado debe devolver el vehiculo más alquilado", () => {
        expect(estadistica.vehiculoMasAlquilado()).toBe(vehiculoTres);
    })

    test("El metodo menosRentabilidad debe devolver el vehiculo con menor rentabilidad", () => {
        expect(estadistica.menosRentabilidad()).toBe(vehiculoUno);
    })

    test("El metodo mayorRentabilidad debe devolver el vehiculo con mayor rentabilidad", () => {
        expect(estadistica.mayorRentabilidad()).toBe(vehiculoDos);
    })
})