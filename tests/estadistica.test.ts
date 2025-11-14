import Estadistica from "../src/estadistica";
import Vehiculo from "../src/vehiculo";
import DatosEstadistica from "../src/datosEstadistica";

describe("Tests Estadística", () =>{
    let estadistica: Estadistica;
    let mockDatosEstadistica: any;
    const mockVehiculo = (vecesAlquilado: number, rentabilidad: number) => ({
          datosEstadistica: {
            getCantidadDeVecesAlquilado: jest.fn().mockReturnValue(vecesAlquilado),
            calcularRentabilidad: jest.fn().mockReturnValue(rentabilidad)
          }
    }) as unknown as Vehiculo;

    beforeEach(()=>{
      estadistica = new Estadistica();
    })

    test("El metodo vehiculoMasAlquilado() debe devolver el vehiculo más alquilado", () => {
      const vehiculo1 = mockVehiculo(2,0);
      const vehiculo2 = mockVehiculo(5,0);
      const vehiculo3 = mockVehiculo(10,0);

      const mockMap = new Map<number, Vehiculo>([
        [1,vehiculo1],
        [2,vehiculo2],
        [3,vehiculo3],
      ])

      const total = estadistica.vehiculoMasAlquilado(mockMap)
      
      expect(total).toBe(vehiculo3);
    })

    test("El metodo menosRentabilidad debe devolver el vehiculo con menor rentabilidad", () => {
        expect(estadistica.menosRentabilidad()).toBe(vehiculoUno);
    })

    test("El metodo mayorRentabilidad debe devolver el vehiculo con mayor rentabilidad", () => {
        expect(estadistica.mayorRentabilidad()).toBe(vehiculoDos);
    })
})