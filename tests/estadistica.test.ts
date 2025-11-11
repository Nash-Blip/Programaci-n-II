import Estadistica from "../src/estadistica";
import Vehiculo from "../src/vehiculo";
import DatosEstadistica from "../src/datosEstadistica";

let vehiculoUno: jest.Mocked<Vehiculo>;
    let vehiculoDos: jest.Mocked<Vehiculo>;
    let vehiculoTres: jest.Mocked<Vehiculo>;

    let vehiculoUnoDatos: jest.Mocked<DatosEstadistica>;
    let vehiculoDosDatos: jest.Mocked<DatosEstadistica>;
    let vehiculoTresDatos: jest.Mocked<DatosEstadistica>;

    function crearDatosEstadisticaMock(): jest.Mocked<DatosEstadistica> {
      return {
        getCantidadDeVecesAlquilado: jest.fn(),
        calcularRentabilidad: jest.fn(),
      } as unknown as jest.Mocked<DatosEstadistica>;
    }

    function crearVehiculoMock(datos: jest.Mocked<DatosEstadistica>): jest.Mocked<Vehiculo> {
      return {
        datosEstadistica: datos,
      } as unknown as jest.Mocked<Vehiculo>;
    }

describe("Tests Estadística", () =>{
    let estadistica: Estadistica;

    beforeEach(()=>{
        estadistica = new Estadistica();

        vehiculoUnoDatos = crearDatosEstadisticaMock();
        vehiculoDosDatos = crearDatosEstadisticaMock();
        vehiculoTresDatos = crearDatosEstadisticaMock();

        vehiculoUno = crearVehiculoMock(vehiculoUnoDatos);
        vehiculoDos = crearVehiculoMock(vehiculoDosDatos);
        vehiculoTres = crearVehiculoMock(vehiculoTresDatos);

        vehiculoUnoDatos.getCantidadDeVecesAlquilado.mockReturnValue(10);
        vehiculoDosDatos.getCantidadDeVecesAlquilado.mockReturnValue(8);
        vehiculoTresDatos.getCantidadDeVecesAlquilado.mockReturnValue(15);

        vehiculoUnoDatos.calcularRentabilidad.mockReturnValue(50);
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